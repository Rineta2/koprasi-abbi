import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/utils/context/AuthContext";

export function useStats() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalProducts: 0,
    totalReferralNetwork: 0,
    totalAccounts: 0,
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Mengambil total transaksi sukses user
        const transactionsRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
        );
        const transactionsQuery = query(
          transactionsRef,
          where("userId", "==", user.uid),
          where("status", "==", "success")
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);

        // Mengambil total produk yang dibeli
        const productsQuery = query(
          transactionsRef,
          where("userId", "==", user.uid),
          where("status", "==", "success")
        );
        const productsSnapshot = await getDocs(productsQuery);

        // Mengambil jaringan referral
        const referralRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string
        );
        const referralQuery = query(
          referralRef,
          where("ownerUid", "==", user.uid)
        );
        const referralSnapshot = await getDocs(referralQuery);
        const referralData = referralSnapshot.docs[0]?.data();
        const totalReferrals = referralData?.supporters?.length || 0;

        setStats({
          totalTransactions: transactionsSnapshot.size,
          totalProducts: productsSnapshot.size,
          totalReferralNetwork: totalReferrals,
          totalAccounts: 1, // User's own account
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  return { stats };
}
