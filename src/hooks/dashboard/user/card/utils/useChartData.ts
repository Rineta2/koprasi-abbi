import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { useAuth } from "@/utils/context/AuthContext";

interface Transaction {
  createdAt: { seconds: number };
  productDetails: {
    title: string;
    category: string;
    image: string;
  };
  amount: number;
  status: string;
  quantity: number;
}

export function useChartData() {
  const [salesData, setSalesData] = useState<
    Array<{ name: string; value: number }>
  >([]);
  const [categoryData, setCategoryData] = useState<
    Array<{ name: string; value: number; color: string }>
  >([]);
  const [topSellingItems, setTopSellingItems] = useState<
    Array<{
      id: number;
      name: string;
      sales: number;
      image: string;
      trend: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  useEffect(() => {
    const fetchChartData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(undefined);

        const transactionsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
        );

        const transactionsQuery = query(
          transactionsRef,
          where("userId", "==", user.uid),
          where("status", "==", "success"),
          limit(7)
        );

        try {
          const fullQuery = query(
            transactionsRef,
            where("userId", "==", user.uid),
            where("status", "==", "success"),
            orderBy("createdAt", "desc"),
            limit(7)
          );

          const snapshot = await getDocs(fullQuery);
          const transactions = snapshot.docs.map((doc) => ({
            ...doc.data(),
          })) as Transaction[];

          // Mengolah data transaksi per hari
          const salesByDay = new Map();
          transactions.forEach((transaction) => {
            const date = new Date(
              transaction.createdAt.seconds * 1000
            ).toLocaleDateString("en-US", { weekday: "short" });
            salesByDay.set(
              date,
              (salesByDay.get(date) || 0) + transaction.amount
            );
          });

          // Mengolah kategori produk
          const categoryCount = new Map();
          transactions.forEach((transaction) => {
            const category =
              transaction.productDetails.category || "Uncategorized";
            categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
          });

          const colors = ["#f43f5e", "#0ea5e9", "#8b5cf6", "#10b981"];

          // Mengolah top selling items
          const topItems = transactions
            .slice(0, 3)
            .map((transaction, index) => ({
              id: index + 1,
              name: transaction.productDetails.title,
              sales: transaction.quantity || 1,
              image: transaction.productDetails.image,
              trend: "+" + Math.floor(Math.random() * 10 + 1) + "%",
            }));

          setSalesData(
            Array.from(salesByDay, ([name, value]) => ({
              name,
              value,
            }))
          );
          setCategoryData(
            Array.from(categoryCount, ([name, value], index) => ({
              name,
              value: Math.round((value / transactions.length) * 100),
              color: colors[index % colors.length],
            }))
          );
          setTopSellingItems(topItems);
          setLoading(false);
        } catch (queryError) {
          const snapshot = await getDocs(transactionsQuery);
          console.warn("Using fallback query while index builds:", queryError);
          const transactions = snapshot.docs.map((doc) => ({
            ...doc.data(),
          })) as Transaction[];

          // Mengolah data transaksi per hari
          const salesByDay = new Map();
          transactions.forEach((transaction) => {
            const date = new Date(
              transaction.createdAt.seconds * 1000
            ).toLocaleDateString("en-US", { weekday: "short" });
            salesByDay.set(
              date,
              (salesByDay.get(date) || 0) + transaction.amount
            );
          });

          // Mengolah kategori produk
          const categoryCount = new Map();
          transactions.forEach((transaction) => {
            const category =
              transaction.productDetails.category || "Uncategorized";
            categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
          });

          const colors = ["#f43f5e", "#0ea5e9", "#8b5cf6", "#10b981"];

          // Mengolah top selling items
          const topItems = transactions
            .slice(0, 3)
            .map((transaction, index) => ({
              id: index + 1,
              name: transaction.productDetails.title,
              sales: transaction.quantity || 1,
              image: transaction.productDetails.image,
              trend: "+" + Math.floor(Math.random() * 10 + 1) + "%",
            }));

          setSalesData(
            Array.from(salesByDay, ([name, value]) => ({
              name,
              value,
            }))
          );
          setCategoryData(
            Array.from(categoryCount, ([name, value], index) => ({
              name,
              value: Math.round((value / transactions.length) * 100),
              color: colors[index % colors.length],
            }))
          );
          setTopSellingItems(topItems);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to load chart data. Please try again later.");
        setLoading(false);
      }
    };

    fetchChartData();
  }, [user]);

  return { salesData, categoryData, topSellingItems, loading, error };
}
