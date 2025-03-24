import { useState, useEffect } from "react";

import { db } from "@/utils/firebase";

import { collection, query, where, getDocs } from "firebase/firestore";

export function useStats() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalProducts: 0,
    totalReferralNetwork: 0,
    totalAccounts: 0,
    totalTestimonials: 0,
    totalArticles: 0,
    totalPartners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Using correct collection names from env
        const transactionsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
        );
        const productsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
        );
        const accountsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
        );
        const referralRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string
        );
        const testimonialsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIALS as string
        );
        const articlesRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
        );
        const partnersRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PARTNER as string
        );

        // Simple queries that match security rules
        const transactionsQuery = query(
          transactionsRef,
          where("status", "==", "success")
        );

        const [
          transactionsSnapshot,
          productsSnapshot,
          accountsSnapshot,
          referralSnapshot,
          testimonialsSnapshot,
          articlesSnapshot,
          partnersSnapshot
        ] = await Promise.all([
          getDocs(transactionsQuery),
          getDocs(productsRef),
          getDocs(accountsRef),
          getDocs(referralRef),
          getDocs(testimonialsRef),
          getDocs(articlesRef),
          getDocs(partnersRef)
        ]);

        setStats({
          totalTransactions: transactionsSnapshot.size,
          totalProducts: productsSnapshot.size,
          totalAccounts: accountsSnapshot.size,
          totalReferralNetwork: referralSnapshot.size,
          totalTestimonials: testimonialsSnapshot.size,
          totalArticles: articlesSnapshot.size,
          totalPartners: partnersSnapshot.size,
        });
      } catch {
        setStats({
          totalTransactions: 0,
          totalProducts: 0,
          totalReferralNetwork: 0,
          totalAccounts: 0,
          totalTestimonials: 0,
          totalArticles: 0,
          totalPartners: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
