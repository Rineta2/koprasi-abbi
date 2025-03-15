import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { PartnerType } from "@/components/ui/partner/lib/schema";

export function FetchPartner(callback: (partner: PartnerType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString() || "",
      })) as PartnerType[]
    );
  });
}
