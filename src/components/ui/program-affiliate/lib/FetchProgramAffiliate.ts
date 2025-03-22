import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ProgramAffiliateType } from "@/components/ui/program-affiliate/lib/schema";

export function FetchProgramAffiliate(
  callback: (programAffiliate: ProgramAffiliateType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROGRAM_AFFILIATE as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ProgramAffiliateType[]
    );
  });
}
