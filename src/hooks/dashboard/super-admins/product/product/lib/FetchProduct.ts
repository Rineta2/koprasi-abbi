import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  getDoc,
  Timestamp,
} from "firebase/firestore";

import { useAuth } from "@/utils/context/AuthContext";

import {
  Product,
  StatusProduct,
} from "@/hooks/dashboard/super-admins/product/product/lib/Product";

import toast from "react-hot-toast";

import imagekitInstance from "@/utils/imagekit";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [statusList, setStatusList] = useState<StatusProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch author data from accounts collection
  const getAuthorData = async (userId: string) => {
    try {
      if (!process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS) {
        throw new Error("Collections accounts path not configured");
      }

      const accountDoc = await getDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS, userId)
      );

      if (!accountDoc.exists()) {
        console.warn(`Author document not found for userId: ${userId}`);
        return {
          id: userId,
          fullName: "Unknown User",
          email: "",
          photoUrl: "",
        };
      }

      const accountData = accountDoc.data();
      return {
        id: userId,
        fullName: accountData.fullName || "Unknown User",
        email: accountData.email || "",
        photoUrl: accountData.photoUrl || "",
      };
    } catch (error) {
      console.error("Error in getAuthorData:", error);
      return {
        id: userId,
        fullName: "Unknown User",
        email: "",
        photoUrl: "",
      };
    }
  };

  // Fetch status list
  const fetchStatusList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "statusProduct"));
      const statusData: StatusProduct[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setStatusList(statusData);
    } catch (error) {
      console.error("Error fetching status list:", error);
      toast.error("Gagal mengambil data status");
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");

      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const productsData: Product[] = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const authorData = await getAuthorData(data.author?.id || "unknown");

        productsData.push({
          id: doc.id,
          title: data.title || "",
          slug: data.slug || "",
          price: data.price || 0,
          image: data.image || "",
          status: data.status || "",
          description: data.description || "",
          author: authorData,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }

      setProducts(productsData);
      console.log(`Successfully processed ${productsData.length} products`);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      toast.error("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  // Create product
  const createProduct = async (
    data: Omit<Product, "id" | "author" | "createdAt" | "updatedAt">,
    image: File
  ) => {
    try {
      setLoading(true);

      if (!user?.uid) {
        throw new Error("User not authenticated");
      }

      const imageUrl = await uploadImage(image);
      const authorData = await getAuthorData(user.uid);

      const now = Timestamp.now();

      const productData = {
        ...data,
        image: imageUrl,
        author: authorData,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Product created with ID:", docRef.id);

      toast.success("Produk berhasil ditambahkan");
      await fetchProducts();
    } catch (error) {
      console.error("Error in createProduct:", error);
      toast.error("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  // Upload image to ImageKit
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          if (e.target?.result) {
            const base64Image = e.target.result.toString().split(",")[1];
            const uploadResponse = await imagekitInstance.upload({
              file: base64Image,
              fileName: `product-${Date.now()}`,
              folder: "/products",
            });
            resolve(uploadResponse.url);
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw new Error("Gagal mengupload gambar");
    }
  };

  // Delete product
  const deleteProduct = async (id: string, imageUrl: string) => {
    try {
      setLoading(true);

      // Delete from ImageKit
      const fileId = imageUrl.split("/").pop()?.split(".")[0];
      if (fileId) {
        try {
          await imagekitInstance.deleteFile(fileId);
          console.log("Image deleted from ImageKit");
        } catch (error) {
          console.error("Error deleting image from ImageKit:", error);
        }
      }

      // Delete from Firestore
      await deleteDoc(doc(db, "products", id));
      console.log("Product deleted from Firestore");

      toast.success("Produk berhasil dihapus");
      await fetchProducts();
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      toast.error("Gagal menghapus produk");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchProducts(), fetchStatusList()]);
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    products,
    statusList,
    loading,
    createProduct,
    deleteProduct,
    fetchProducts,
  };
};
