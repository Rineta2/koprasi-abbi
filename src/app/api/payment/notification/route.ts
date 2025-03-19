import { NextResponse } from "next/server";
import { auth, db } from "@/utils/firebase/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    // Verifikasi auth
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
    const notification = await request.json();
    console.log("Notification data received:", notification);

    // Validasi data yang diperlukan
    if (!notification.orderId || !notification.status) {
      return NextResponse.json(
        { error: "Invalid notification data" },
        { status: 400 }
      );
    }

    // Cari transaksi di Firestore
    const transactionsRef = db.collection(
      process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS || "transactions"
    );
    const querySnapshot = await transactionsRef
      .where("orderId", "==", notification.orderId)
      .where("userId", "==", decodedToken.uid)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    const transactionDoc = querySnapshot.docs[0];

    // Update status transaksi
    const updateData = {
      status: notification.status,
      updatedAt: Timestamp.now(),
      amount: notification.gross_amount
        ? parseFloat(notification.gross_amount)
        : 0,
      orderId: notification.orderId,
      midtransToken: notification.transaction_id,
      userId: decodedToken.uid,
      productDetails: {
        id: notification.product?.id,
        title: notification.product?.title,
        price: notification.product?.price,
        status: notification.product?.status,
        image: notification.product?.image,
      },
      paymentDetails: {
        transactionId: notification.transaction_id,
        paymentType: notification.payment_type,
        transactionTime: notification.transaction_time,
        transactionStatus: notification.transaction_status,
        grossAmount: notification.gross_amount,
        statusMessage: notification.status_message,
        statusCode: notification.status_code,
      },
    };

    await transactionDoc.ref.update(updateData);

    // Log untuk debugging
    console.log("Transaction updated successfully:", {
      transactionId: transactionDoc.id,
      orderId: notification.orderId,
      status: notification.status,
    });

    return NextResponse.json({
      success: true,
      message: "Transaction status updated successfully",
      transactionId: transactionDoc.id,
      orderId: notification.orderId,
      status: notification.status,
    });
  } catch (error) {
    console.error("Error processing notification:", error);
    return NextResponse.json(
      {
        error: "Failed to process notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
