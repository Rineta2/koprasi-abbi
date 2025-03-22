import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { BonusSponsorType } from "@/components/ui/bonus-sponsor/lib/schema";

export function FetchBonusSponsor(
  callback: (bonusSponsor: BonusSponsorType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BONUS_SPONSOR as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as BonusSponsorType[]
    );
  });
}
