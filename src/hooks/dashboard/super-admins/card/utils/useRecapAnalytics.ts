import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

interface ProductDetails {
    id: string;
    title: string;
    image: string;
}

interface UserDetails {
    userId: string;
    fullName: string;
    email: string;
    photoURL: string;
}

interface Transaction {
    id: string;
    amount: number;
    status: 'success' | 'pending' | 'failed';
    createdAt: {
        toDate: () => Date;
    };
    userDetails: UserDetails;
    productDetails: ProductDetails;
}

interface UserTransaction {
    userId: string;
    fullName: string;
    email: string;
    photoURL: string;
    transactions: Array<{
        id: string;
        amount: number;
        date: Date;
        productDetails: {
            id: string;
            title: string;
            image: string;
        };
        status: string;
    }>;
    totalAmount: number;
    lastTransactionDate: Date;
}

interface RecapStats {
    totalAmount: number;
    successAmount: number;
    pendingAmount: number;
    failedAmount: number;
    totalTransactions: number;
    successTransactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    averageTransactionValue: number;
    userTransactions: UserTransaction[];
}

export function useRecapAnalytics() {
    const [recapStats, setRecapStats] = useState<RecapStats>({
        totalAmount: 0,
        successAmount: 0,
        pendingAmount: 0,
        failedAmount: 0,
        totalTransactions: 0,
        successTransactions: 0,
        pendingTransactions: 0,
        failedTransactions: 0,
        averageTransactionValue: 0,
        userTransactions: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecapData = async () => {
            try {
                setLoading(true);
                const transactionsRef = collection(
                    db,
                    process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string
                );

                const snapshot = await getDocs(transactionsRef);
                const transactions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                // Initialize counters
                let totalAmount = 0;
                let successAmount = 0;
                let pendingAmount = 0;
                let failedAmount = 0;
                let successTransactions = 0;
                let pendingTransactions = 0;
                let failedTransactions = 0;

                // Track user transactions
                const userTransactionsMap = new Map<string, UserTransaction>();

                transactions.forEach(transaction => {
                    const amount = Number(transaction.amount) || 0;
                    totalAmount += amount;

                    // Count transactions by status
                    switch (transaction.status) {
                        case 'success':
                            successAmount += amount;
                            successTransactions++;
                            break;
                        case 'pending':
                            pendingAmount += amount;
                            pendingTransactions++;
                            break;
                        case 'failed':
                            failedAmount += amount;
                            failedTransactions++;
                            break;
                    }

                    // Process user transactions
                    if (transaction.status === 'success') {
                        const userIdentifier = transaction.userDetails?.email || transaction.userDetails?.userId;

                        if (!userTransactionsMap.has(userIdentifier)) {
                            userTransactionsMap.set(userIdentifier, {
                                userId: userIdentifier,
                                fullName: transaction.userDetails?.fullName || 'Unknown',
                                email: transaction.userDetails?.email || 'No Email',
                                photoURL: transaction.userDetails?.photoURL || '/default-avatar.png',
                                transactions: [],
                                totalAmount: 0,
                                lastTransactionDate: new Date(0),
                            });
                        }

                        const userStats = userTransactionsMap.get(userIdentifier)!;
                        userStats.transactions.push({
                            id: transaction.id,
                            amount: amount,
                            date: transaction.createdAt.toDate(),
                            productDetails: {
                                id: transaction.productDetails?.id || '',
                                title: transaction.productDetails?.title || '',
                                image: transaction.productDetails?.image || '',
                            },
                            status: transaction.status
                        });

                        userStats.totalAmount += amount;

                        const transactionDate = transaction.createdAt.toDate();
                        if (transactionDate > userStats.lastTransactionDate) {
                            userStats.lastTransactionDate = transactionDate;
                        }
                    }
                });

                // Calculate average transaction value
                const totalTransactions = transactions.length;
                const averageTransactionValue = totalTransactions > 0
                    ? totalAmount / totalTransactions
                    : 0;

                // Convert to array and sort users by total amount
                const sortedUserTransactions = Array.from(userTransactionsMap.values())
                    .sort((a, b) => b.totalAmount - a.totalAmount);

                const stats = {
                    totalAmount,
                    successAmount,
                    pendingAmount,
                    failedAmount,
                    totalTransactions,
                    successTransactions,
                    pendingTransactions,
                    failedTransactions,
                    averageTransactionValue,
                    userTransactions: sortedUserTransactions,
                };

                setRecapStats(stats);

            } catch {
                setError('Failed to load recap data');
            } finally {
                setLoading(false);
            }
        };

        fetchRecapData();
    }, []);

    return { recapStats, loading, error };
}