import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ProgramAffiliateKoperasiType } from "@/components/ui/ProgramAffiliateKoperasi/lib/schema";

export function FetchProgramAffiliateKoperasi(
  callback: (programAffiliateKoperasi: ProgramAffiliateKoperasiType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROGRAM_AFFILIATE_KOPERASI_ABBI as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ProgramAffiliateKoperasiType[]
    );
  });
}
