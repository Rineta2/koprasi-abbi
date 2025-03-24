import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

import { Role } from "@/utils/context/interface/Auth";

interface CreateAdminBody {
  email: string;
  password: string;
  fullName: string;
  role: Role.ADMIN | Role.SUPER_ADMIN;
}

export async function POST(request: Request) {
  try {
    // Validate request format
    if (!request.body) {
      return NextResponse.json({ error: "No request body" }, { status: 400 });
    }

    // Parse and validate request body
    const body = await request.json();
    const { email, password, fullName, role } = body as CreateAdminBody;

    // Validate required fields
    if (!email || !password || !fullName || !role) {
      return NextResponse.json({
        error: "Missing required fields",
        received: { hasEmail: !!email, hasPassword: !!password, hasFullName: !!fullName, hasRole: !!role }
      }, { status: 400 });
    }

    // Validate role
    if (role !== Role.ADMIN && role !== Role.SUPER_ADMIN) {
      return NextResponse.json({
        error: "Invalid role. Must be ADMIN or SUPER_ADMIN"
      }, { status: 400 });
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS;
    if (!collectionPath) {
      throw new Error("Collection path not configured");
    }

    const userData = {
      uid: userRecord.uid,
      email,
      fullName,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      username: email.split('@')[0].toLowerCase(),
      photoURL: "",
    };

    await db
      .collection(collectionPath)
      .doc(userRecord.uid)
      .set(userData);

    return NextResponse.json({
      message: "Admin created successfully",
      uid: userRecord.uid
    });

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      details: process.env.NODE_ENV === 'development' ?
        error instanceof Error ? error.stack : 'No stack trace available'
        : undefined
    }, { status: 500 });
  }
}