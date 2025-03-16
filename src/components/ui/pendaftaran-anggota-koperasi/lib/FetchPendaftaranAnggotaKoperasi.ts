import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { PendaftaranAnggotaKoperasiType } from "@/components/ui/pendaftaran-anggota-koperasi/lib/schema";

export function FetchPendaftaranAnggotaKoperasi(
  callback: (pendaftaranAnggotaKoperasi: PendaftaranAnggotaKoperasiType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PENDAFTARAN_ANGGOTA_KOPERASI as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as PendaftaranAnggotaKoperasiType[]
    );
  });
}

