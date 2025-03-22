import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { PrizePoolType } from "@/components/ui/prize-pool/lib/schema";

export function FetchPrizePool(callback: (prizePool: PrizePoolType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRIZES as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as PrizePoolType[]
    );
  });
}
