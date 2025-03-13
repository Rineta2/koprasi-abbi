import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ||
  !process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
) {
  throw new Error("Firebase Admin environment variables are missing");
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    ),
  }),
};

const app =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseAdminConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
