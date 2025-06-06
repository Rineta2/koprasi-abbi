import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { ImpianAndaContent } from "@/hooks/dashboard/super-admins/layout/impian-anda/lib/ImpianAnda";

export const useImpianAndaData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [impianAnda, setImpianAnda] = useState<ImpianAndaContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_IMPIAN_ANDA as string
        )
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ImpianAndaContent[];
      setImpianAnda(contentArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });

      const base64 = await base64Promise;
      const result = await imagekitInstance.upload({
        file: base64,
        fileName: `impian-anda-${Date.now()}`,
        folder: "/impian-anda",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const createContent = async (data: ImpianAndaContent) => {
    await addDoc(
      collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_IMPIAN_ANDA as string),
      {
        ...data,
        createdAt: new Date(),
      }
    );
    await fetchContents();
  };

  const handleUpdate = async (id: string, updatedData: ImpianAndaContent) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_IMPIAN_ANDA as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date(),
      });
      await fetchContents();
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_IMPIAN_ANDA as string,
        id
      );
      await deleteDoc(docRef);
      await fetchContents();
      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return {
    isLoading,
    impianAnda,
    isSubmitting,
    setIsSubmitting,
    handleImageUpload,
    createContent,
    handleUpdate,
    handleDelete,
    fetchContents,
  };
};
