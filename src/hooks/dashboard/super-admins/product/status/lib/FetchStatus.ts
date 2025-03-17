import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { StatusContent } from "@/hooks/dashboard/super-admins/product/status/lib/schema";

const COLLECTION_NAME = process.env
  .NEXT_PUBLIC_COLLECTIONS_STATUS_PRODUCT as string;

export const statusService = {
  fetchStatus: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as StatusContent)
      )
      .sort(
        (a, b) =>
          (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
      ) as StatusContent[];
  },

  createStatus: async (data: StatusContent) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
  },

  updateStatus: async (id: string, data: StatusContent) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  deleteStatus: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },

  subscribeToStatus: (callback: (data: StatusContent[]) => void) => {
    return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
      const statusList = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as StatusContent)
        )
        .sort(
          (a, b) =>
            (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
        ) as StatusContent[];
      callback(statusList);
    });
  },
};
