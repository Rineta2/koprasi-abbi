import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ImpianAndaType } from "@/components/ui/impian-anda/lib/schema";

export function FetchImpianAnda(
  callback: (impianAnda: ImpianAndaType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_IMPIAN_ANDA as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ImpianAndaType[]
    );
  });
}
