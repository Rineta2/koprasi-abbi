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

import { TagsContent } from "@/hooks/dashboard/super-admins/product/tags/lib/schema";

const COLLECTION_NAME = process.env
  .NEXT_PUBLIC_COLLECTIONS_TAGS_PRODUCTS as string;

export const tagsService = {
  fetchTags: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as TagsContent)
      )
      .sort(
        (a, b) =>
          (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
      ) as TagsContent[];
  },

  createTags: async (data: TagsContent) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
  },

  updateTags: async (id: string, data: TagsContent) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  deleteTags: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },

  subscribeToTags: (callback: (data: TagsContent[]) => void) => {
    return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
      const tagsList = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as TagsContent)
        )
        .sort(
          (a, b) =>
            (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
        ) as TagsContent[];
      callback(tagsList);
    });
  },
};
