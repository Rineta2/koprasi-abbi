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
  onSnapshot,
  limit,
  startAfter,
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
  const [totalPages, setTotalPages] = useState(0);
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
        photoUrl: accountData.photoURL || "",
      };
    } catch {
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
    } catch {
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
    } catch {
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
    } catch {
      toast.error("Gagal mengambil data kategori");
    }
  };

  // Fetch products with realtime updates
  const fetchProducts = async (page: number = 0) => {
    try {
      setLoading(true);
      const ITEMS_PER_PAGE = 10;

      const productsRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
      );

      // Pertama, ambil total dokumen untuk perhitungan halaman
      const totalSnapshot = await getDocs(productsRef);
      const totalDocs = totalSnapshot.size;
      setTotalPages(Math.ceil(totalDocs / ITEMS_PER_PAGE));

      // Buat query dengan pagination
      let q = query(
        productsRef,
        orderBy("createdAt", "desc"),
        limit(ITEMS_PER_PAGE)
      );

      // Jika bukan halaman pertama, tambahkan startAfter
      if (page > 0) {
        const lastVisible = await getDocs(
          query(
            productsRef,
            orderBy("createdAt", "desc"),
            limit(page * ITEMS_PER_PAGE)
          )
        );
        const lastDoc = lastVisible.docs[lastVisible.docs.length - 1];
        q = query(
          productsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(ITEMS_PER_PAGE)
        );
      }

      // Replace getDocs with onSnapshot
      const unsubscribe = onSnapshot(
        q,
        async (querySnapshot) => {
          const productsData: Product[] = [];

          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const authorData = await getAuthorData(
              data.author?.id || "unknown"
            );

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
          setLoading(false);
        },
        () => {
          toast.error("Gagal mengambil data produk");
          setLoading(false);
        }
      );

      // Return unsubscribe function
      return unsubscribe;
    } catch {
      toast.error("Gagal mengambil data produk");
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

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string),
        productData
      );
      await fetchProducts();
    } catch {
      toast.error("Gagal membuat produk");
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
    } catch {
      throw new Error("Gagal mengupload gambar");
    }
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);

      // Delete from Firestore only
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string, id)
      );

      toast.success("Produk berhasil dihapus");
      await fetchProducts();
    } catch {
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
      let imageUrl = data.image;

      if (newImage) {
        const oldFileId = data.image.split("/").pop()?.split(".")[0];
        if (oldFileId) {
          try {
            await imagekitInstance.deleteFile(oldFileId);
          } catch {
            // Silently handle error
          }
        }
        imageUrl = await uploadImage(newImage);
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

      await updateDoc(productRef, updateData);
      await fetchProducts();
    } catch {
      toast.error("Gagal mengupdate produk");
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to handle cleanup
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      unsubscribe = await fetchProducts();
      await Promise.all([
        fetchStatusList(),
        fetchTagsList(),
        fetchCategoryList(),
      ]);
    };

    init();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
    totalPages,
  };
};
