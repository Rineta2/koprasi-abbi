import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { InsplenstasiType } from "@/components/ui/insplenstasi/lib/schema";

export function FetchInsplentasi(
  callback: (insplenstasi: InsplenstasiType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_INSPLENSIASI as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as InsplenstasiType[]
    );
  });
}
