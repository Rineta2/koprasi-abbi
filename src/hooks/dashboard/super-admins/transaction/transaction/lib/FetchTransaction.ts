import { useState, useCallback } from "react";

import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { TransactionType, UserAccount, Product } from "./transaction";

import { User } from "firebase/auth";

// Buat union type untuk mengakomodasi kedua tipe
type AuthUser = User | UserAccount | null;

export function useTransaction(user: AuthUser) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const fetchTransactions = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Log untuk debugging
      console.log("Fetching transactions...");

      const transactionRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
      );
      const snapshot = await getDocs(transactionRef);

      // Log untuk debugging
      console.log("Snapshot size:", snapshot.size);

      const transactionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TransactionType[];

      // Log untuk debugging
      console.log("Fetched transactions:", transactionData);

      setTransactions(transactionData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Terjadi kesalahan saat mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchUsers = useCallback(async () => {
    try {
      const accountsRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
      );
      const querySnapshot = await getDocs(accountsRef);
      const accountsData = querySnapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as UserAccount)
        )
        .filter(
          (account) => account.role === "user" && account.isActive === true
        );

      setUsers(accountsData);
      console.log("Fetched users:", accountsData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const productsRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
      );
      const snapshot = await getDocs(productsRef);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
      console.log("Fetched products:", productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.userDetails.fullName
        .toLowerCase()
        .includes(transactionSearchQuery.toLowerCase()) ||
      transaction.productDetails.title
        .toLowerCase()
        .includes(transactionSearchQuery.toLowerCase()) ||
      transaction.orderId
        .toLowerCase()
        .includes(transactionSearchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;

    const matchesDate = () => {
      if (!selectedDate) return true;

      const transactionDate = new Date(
        transaction.paymentDetails.transactionTime
      );
      return (
        transactionDate.getFullYear() === selectedDate.getFullYear() &&
        transactionDate.getMonth() === selectedDate.getMonth() &&
        transactionDate.getDate() === selectedDate.getDate()
      );
    };

    return matchesSearch && matchesStatus && matchesDate();
  });

  const paginatedTransactions = filteredTransactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  const createManualTransaction = async () => {
    if (!selectedUser || !selectedProduct) return;

    try {
      setIsCreatingTransaction(true);

      const selectedUserData = users.find((u) => u.id === selectedUser);
      const selectedProductData = products.find(
        (p) => p.id === selectedProduct
      );

      if (!selectedUserData || !selectedProductData) return;

      const currentTime = new Date().toISOString();
      const transactionId = `TRX-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;

      const transactionData = {
        amount: selectedProductData.price,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        orderId: `ORDER-${transactionId}`,
        status: "success",
        midtransToken: "-",
        transactionLink: "-",
        productDetails: {
          id: selectedProductData.id,
          title: selectedProductData.title,
          price: selectedProductData.price,
          image: selectedProductData.image,
          status: selectedProductData.status,
        },
        userDetails: {
          id: selectedUserData.id,
          userId: selectedUserData.uid,
          fullName: selectedUserData.fullName,
          email: selectedUserData.email,
          accountType: selectedUserData.accountType,
          photoURL: selectedUserData.photoURL || "",
        },
        paymentDetails: {
          grossAmount: selectedProductData.price.toString(),
          paymentType: "Manual Transaction",
          statusCode: "200",
          statusMessage: "Transaction Success",
          transactionId: transactionId,
          transactionStatus: "success",
          transactionTime: currentTime,
        },
      };

      const transactionRef = collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
      );
      await addDoc(transactionRef, transactionData);

      setSelectedUser("");
      setSelectedProduct("");
      await fetchTransactions();
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  return {
    transactions: paginatedTransactions,
    loading,
    error,
    users,
    products,
    selectedUser,
    selectedProduct,
    searchQuery,
    isCreatingTransaction,
    transactionSearchQuery,
    selectedStatus,
    selectedDate,
    selectedTransaction,
    currentPage,
    pageCount,
    filteredTransactions,
    setSelectedUser,
    setSelectedProduct,
    setSearchQuery,
    setTransactionSearchQuery,
    setSelectedStatus,
    setSelectedDate,
    setSelectedTransaction,
    setCurrentPage,
    fetchTransactions,
    fetchUsers,
    fetchProducts,
    createManualTransaction,
  };
}
