import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { TrendBisnisType } from "@/components/ui/trend-bisnis/lib/schema";

export function FetchTrendBisnis(
  callback: (trendBisnis: TrendBisnisType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TREND_BISNIS as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as TrendBisnisType[]
    );
  });
}
