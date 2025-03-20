import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

import { Timestamp } from "firebase-admin/firestore";

import midtransClient from "midtrans-client";

// Validate environment variables first
if (!process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY) {
  console.error("MIDTRANS_SERVER_KEY is not defined");
  throw new Error("MIDTRANS_SERVER_KEY is not defined");
}

if (!process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY) {
  console.error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not defined");
  throw new Error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not defined");
}

// Initialize Midtrans with error handling
let snap: midtransClient.Snap;
try {
  snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY as string,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY as string,
  });
} catch (error) {
  console.error("Failed to initialize Midtrans:", error);
  throw error;
}

export async function POST(request: Request) {
  console.log("Payment API called");

  try {
    // Verify authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized", details: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Parse request body
    const paymentData = await request.json();
    console.log("Payment data received:", JSON.stringify(paymentData, null, 2));

    if (!paymentData.product?.price || !paymentData.product?.title) {
      console.error("Invalid payment data:", paymentData);
      return NextResponse.json(
        { error: "Invalid payment data", details: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare transaction details
    const orderId = `ORDER-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;
    const transactionDetails = {
      transaction_details: {
        order_id: orderId,
        gross_amount: parseInt(paymentData.product.price),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: paymentData.user.fullName || "Customer",
        email: paymentData.user.email,
      },
      item_details: [
        {
          id: paymentData.product.id,
          price: parseInt(paymentData.product.price),
          quantity: 1,
          name: paymentData.product.title.substring(0, 50),
        },
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_URL}/payment/finish`,
        error: `${process.env.NEXT_PUBLIC_URL}/payment/error`,
        pending: `${process.env.NEXT_PUBLIC_URL}/payment/pending`,
      },
      enabled_payments: ["credit_card", "bank_transfer", "gopay", "shopeepay"],
      expiry: {
        unit: "minutes",
        duration: 60,
      },
    };

    console.log(
      "Creating Midtrans transaction:",
      JSON.stringify(transactionDetails, null, 2)
    );

    // Create Midtrans transaction
    let midtransResponse;
    try {
      midtransResponse = await snap.createTransaction(transactionDetails);
      console.log("Midtrans response:", midtransResponse);
    } catch (midtransError) {
      console.error("Midtrans transaction failed:", midtransError);
      return NextResponse.json(
        {
          error: "Payment processing failed",
          details:
            midtransError instanceof Error
              ? midtransError.message
              : "Midtrans error",
        },
        { status: 500 }
      );
    }

    // Create Firestore transaction record
    try {
      const transactionData = {
        userId: decodedToken.uid,
        orderId: orderId,
        amount: paymentData.product.price,
        status: "pending",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        midtransToken: midtransResponse.token,
        transactionLink: `${process.env.NEXT_PUBLIC_URL}/payment/status/${orderId}`,
        userDetails: {
          id: paymentData.user.id,
          email: paymentData.user.email,
          fullName: paymentData.user.fullName,
          photoURL: paymentData.user.photoURL,
          accountType: paymentData.user.accountType,
        },
        productDetails: paymentData.product,
        paymentDetails: {
          method: "midtrans",
          token: midtransResponse.token,
          redirectUrl: midtransResponse.redirect_url,
          transactionId: null,
          paymentType: null,
          transactionTime: null,
          transactionStatus: "pending",
          grossAmount: paymentData.product.price,
          statusMessage: null,
          statusCode: null,
          vaNumbers: [],
        },
      };

      await db.collection("transactions").add(transactionData);

      return NextResponse.json({
        success: true,
        token: midtransResponse.token,
        orderId: orderId,
      });
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return NextResponse.json(
        {
          error: "Database operation failed",
          details:
            dbError instanceof Error ? dbError.message : "Database error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
