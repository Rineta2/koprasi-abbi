import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { SisaHasilUsahaType } from "@/components/ui/sisa-hasil-usaha/lib/SisaHasilUsaha";

export function FetchSisaHasilUsaha(
    callback: (sisaHasilUsaha: SisaHasilUsahaType[]) => void
) {
    const q = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SISA_HASIL_USAHA as string),
        where("createdAt", "!=", "")
    );

    return onSnapshot(q, (snapshot) => {
        callback(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.().toISOString(),
            })) as SisaHasilUsahaType[]
        );
    });
}
