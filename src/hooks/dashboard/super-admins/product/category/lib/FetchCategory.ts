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

import { Category } from "@/hooks/dashboard/super-admins/product/category/lib/schema";

const COLLECTION_NAME = process.env
  .NEXT_PUBLIC_COLLECTIONS_CATEGORY_PRODUCTS as string;

export const categoryService = {
  fetchCategory: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Category)
      )
      .sort(
        (a, b) =>
          (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
      ) as Category[];
  },

  createCategory: async (data: Category) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
  },

  updateCategory: async (id: string, data: Category) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  deleteCategory: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },

  subscribeToCategory: (callback: (data: Category[]) => void) => {
    return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
      const categoryList = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Category)
        )
        .sort(
          (a, b) =>
            (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0)
        ) as Category[];
      callback(categoryList);
    });
  },
};
