import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { LegalisasiType } from "@/components/ui/legalisasi/lib/schema";

export function FetchLegalisasi(callback: (home: LegalisasiType[]) => void) {
  const q = query(
    collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_LEGALITASI_COMPANY as string
    ),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as LegalisasiType[]
    );
  });
}
