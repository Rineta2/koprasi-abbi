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
  updateDoc,
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
  const [tagsList, setTagsList] = useState<StatusProduct[]>([]);
  const [categoryList, setCategoryList] = useState<StatusProduct[]>([]);
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
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_STATUS_PRODUCTS as string
        )
      );
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

  // Fetch tags list
  const fetchTagsList = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TAGS_PRODUCTS as string
        )
      );
      const tagsData: StatusProduct[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setTagsList(tagsData);
    } catch (error) {
      console.error("Error fetching tags list:", error);
      toast.error("Gagal mengambil data tags");
    }
  };

  // Fetch category list
  const fetchCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PRODUCTS as string
        )
      );
      const categoryData: StatusProduct[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setCategoryList(categoryData);
    } catch (error) {
      console.error("Error fetching category list:", error);
      toast.error("Gagal mengambil data kategori");
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");

      const productsRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
      );
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
          tags: data.tags || [],
          category: data.category || "",
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

      const docRef = await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string),
        productData
      );
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
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string, id)
      );
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

  // Add updateProduct function
  const updateProduct = async (
    id: string,
    data: Omit<Product, "id" | "author" | "createdAt" | "updatedAt">,
    newImage?: File
  ) => {
    try {
      setLoading(true);
      console.log("Updating product:", id, data);

      let imageUrl = data.image;

      // If there's a new image, upload it and delete the old one
      if (newImage) {
        console.log("Uploading new image...");
        // Delete old image if it exists
        const oldFileId = data.image.split("/").pop()?.split(".")[0];
        if (oldFileId) {
          try {
            await imagekitInstance.deleteFile(oldFileId);
            console.log("Old image deleted");
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }

        // Upload new image
        imageUrl = await uploadImage(newImage);
        console.log("New image uploaded:", imageUrl);
      }

      const now = Timestamp.now();

      const productRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string,
        id
      );

      const updateData = {
        ...data,
        image: imageUrl,
        updatedAt: now,
      };

      console.log("Updating document with data:", updateData);

      await updateDoc(productRef, updateData);
      console.log("Document updated successfully");

      toast.success("Produk berhasil diperbarui");
      await fetchProducts(); // Refresh the products list
    } catch (error) {
      console.error("Error in updateProduct:", error);
      toast.error("Gagal memperbarui produk");
      throw error; // Re-throw the error to be caught by the form
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      await Promise.all([
        fetchProducts(),
        fetchStatusList(),
        fetchTagsList(),
        fetchCategoryList(),
      ]);
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    products,
    statusList,
    tagsList,
    categoryList,
    loading,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProducts,
  };
};
