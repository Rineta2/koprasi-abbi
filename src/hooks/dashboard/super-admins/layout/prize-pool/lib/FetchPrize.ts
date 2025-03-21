import { db } from "@/utils/firebase";

import imagekitInstance from "@/utils/imagekit";

import { UploadResponse } from "imagekit/dist/libs/interfaces";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { Prize } from "@/hooks/dashboard/super-admins/layout/prize-pool/lib/prize";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTIONS_PRIZES as string;

export const prizeService = {
  // Create
  async createPrize(prize: Omit<Prize, "id">, imageFile: File) {
    try {
      // Convert File to base64
      const base64Image = await fileToBase64(imageFile);

      // Upload image ke ImageKit
      const uploadResponse = await imagekitInstance.upload({
        file: base64Image,
        fileName: `prize-${Date.now()}`,
        folder: "/prizes",
      });

      // Simpan data ke Firebase
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...prize,
        imageUrl: uploadResponse.url,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { id: docRef.id, ...prize, imageUrl: uploadResponse.url };
    } catch (err) {
      console.error("Failed to create prize:", err);
      throw new Error("Failed to create prize");
    }
  },

  // Read
  async getAllPrizes(): Promise<Prize[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Prize)
      );
    } catch (err) {
      console.error("Failed to fetch prizes:", err);
      throw new Error("Failed to fetch prizes");
    }
  },

  // Update
  async updatePrize(prize: Prize, newImage?: File | null) {
    try {
      let imageUrl = prize.imageUrl;

      if (newImage) {
        // Upload image baru terlebih dahulu
        imageUrl = await this.uploadImage(newImage);

        // Jika berhasil upload image baru, hapus image lama
        if (prize.imageUrl) {
          await this.deleteImage(prize.imageUrl).catch(console.error);
        }
      }

      const prizeRef = doc(db, "prizes", prize.id);
      await updateDoc(prizeRef, {
        ...prize,
        imageUrl,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating prize:", error);
      throw error;
    }
  },

  // Delete
  async deletePrize(id: string, imageUrl: string) {
    try {
      // Delete dari Firebase
      await deleteDoc(doc(db, COLLECTION_NAME, id));

      // Delete image dari ImageKit
      const fileId = imageUrl.split("/").pop();
      if (fileId) {
        await imagekitInstance.deleteFile(fileId);
      }
    } catch (err) {
      console.error("Failed to delete prize:", err);
      throw new Error("Failed to delete prize");
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      // Konversi File ke base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(",")[1]); // Ambil bagian base64 saja
        };
        reader.readAsDataURL(file);
      });

      const response = (await imagekitInstance.upload({
        file: base64,
        fileName: `prize_${Date.now()}`,
        folder: "/prizes",
      })) as UploadResponse;

      return response.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  async deleteImage(imageUrl: string) {
    try {
      // Dapatkan fileId dari URL
      const fileId = imageUrl.split("/").pop()?.split(".")[0];
      if (fileId) {
        await imagekitInstance.deleteFile(fileId);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};

// Helper function untuk convert File ke base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
