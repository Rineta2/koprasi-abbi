import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { PartnerContent } from "@/hooks/dashboard/super-admins/layout/patner/lib/partner";

export const usePartnerContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<PartnerContent[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<PartnerContent>({
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string)
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
      })) as PartnerContent[];
      setContents(contentArray);
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
        fileName: `partner${Date.now()}`,
        folder: "/partner",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;
      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }

      if (isEditing && editingId) {
        await handleUpdate(editingId, {
          ...formData,
          imageUrl: selectedImage ? imageUrl : formData.imageUrl,
        });
        toast.success("Content updated successfully!");
      } else {
        await addDoc(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string),
          {
            ...formData,
            imageUrl,
            createdAt: new Date(),
          }
        );
        toast.success("Partner created successfully!");
      }

      setIsEditing(false);
      setEditingId(null);
      setFormData({
        imageUrl: "",
      });
      setSelectedImage(null);
      fetchContents();

      const modal = document.getElementById(
        "content_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
    } catch (error) {
      console.error("Error submitting content:", error);
      toast.error("Failed to save content. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, updatedData: PartnerContent) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date(),
      });
      fetchContents();
    } catch (error) {
      console.error("Error updating partner:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string,
        id
      );
      await deleteDoc(docRef);
      fetchContents();
      toast.success("Partner deleted successfully!");
      const deleteModal = document.getElementById(
        "delete_modal"
      ) as HTMLDialogElement | null;
      deleteModal?.close();
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error("Failed to delete partner. Please try again.");
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedImage));
      }
    };
  }, [selectedImage]);

  return {
    isLoading,
    contents,
    handleSubmit,
    handleDelete,
    isSubmitting,
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    isEditing,
    setIsEditing,
    editingId,
    setEditingId,
  };
};

export const useModal = () => {
  const openContentModal = () => {
    const modal = document.getElementById(
      "content_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const openDeleteModal = () => {
    const modal = document.getElementById(
      "delete_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return {
    openContentModal,
    openDeleteModal,
  };
};
