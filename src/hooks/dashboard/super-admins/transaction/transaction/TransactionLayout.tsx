"use client"

import { useEffect } from 'react'
import { useAuth } from '@/utils/context/AuthContext'
import { User } from 'firebase/auth'
import TransactionSkelaton from "./TransactionSkelaton"
import { Pagination } from '@/base/helper/Pagination'
import { useTransaction } from './lib/FetchTransaction'
import { TransactionHeader } from './ui/TransactionHeader'
import { TransactionFilters } from './ui/TransactionFilters'
import { TransactionCard } from './ui/TransactionCard'
import { TransactionDetailModal } from './ui/TransactionDetailModal'
import { CreateTransactionModal } from './ui/TransactionModal'
import { TransactionType } from './lib/transaction'

export default function TransactionLayout() {
    const { user } = useAuth()
    const {
        transactions,
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
        createManualTransaction
    } = useTransaction(user as User | null)

    useEffect(() => {
        fetchTransactions()
        fetchUsers()
        fetchProducts()
    }, [fetchTransactions, fetchUsers, fetchProducts])

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const openModal = () => {
        const modal = document.getElementById('create_transaction_modal') as HTMLDialogElement
        if (modal) {
            modal.showModal()
        }
    }

    const openTransactionDetail = (transaction: TransactionType) => {
        setSelectedTransaction(transaction)
        const modal = document.getElementById('transaction_detail_modal') as HTMLDialogElement
        if (modal) {
            modal.showModal()
        }
    }

    if (!user) {
        return <div className="text-center p-8">Silakan login terlebih dahulu</div>
    }

    if (loading) {
        return <TransactionSkelaton />
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>
    }

    return (
        <section className='min-h-screen py-0 px-0'>
            <TransactionHeader onCreateClick={openModal} />

            <TransactionFilters
                transactionSearchQuery={transactionSearchQuery}
                selectedStatus={selectedStatus}
                selectedDate={selectedDate}
                onSearchChange={setTransactionSearchQuery}
                onStatusChange={setSelectedStatus}
                onDateChange={setSelectedDate}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                {transactions.map(transaction => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        openTransactionDetail={openTransactionDetail}
                    />
                ))}
            </div>

            {filteredTransactions.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}

            <TransactionDetailModal
                transaction={selectedTransaction}
            />

            <CreateTransactionModal
                users={users}
                products={products}
                selectedUser={selectedUser}
                selectedProduct={selectedProduct}
                searchQuery={searchQuery}
                isCreatingTransaction={isCreatingTransaction}
                onUserSelect={setSelectedUser}
                onProductSelect={setSelectedProduct}
                onSearchChange={setSearchQuery}
                onCreateTransaction={createManualTransaction}
            />
        </section>
    )
}

