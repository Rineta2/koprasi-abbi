import { motion } from 'framer-motion'
import Image from 'next/image'
import { TransactionType } from '../lib/transaction'

interface TransactionCardProps {
    transaction: TransactionType;
    openTransactionDetail: (transaction: TransactionType) => void;
}

export function TransactionCard({ transaction, openTransactionDetail }: TransactionCardProps) {
    return (
        <motion.div
            key={transaction.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group hover:border-primary/20"
        >
            <div className="absolute top-4 right-4 z-10">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${transaction.status === 'success'
                    ? 'bg-green-50 text-green-600 ring-1 ring-green-500/20'
                    : 'bg-yellow-50 text-yellow-600 ring-1 ring-yellow-500/20'
                    }`}>
                    {transaction.status === 'success' ? 'Success' : 'Pending'}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Product Info */}
                <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src={transaction.productDetails.image || '/default-product.png'}
                            alt={transaction.productDetails.title}
                            width={100}
                            height={100}
                            className="w-28 h-28 object-cover rounded-xl shadow-md"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
                            {transaction.productDetails.title}
                        </h3>

                        {/* User Info */}
                        <div className="mt-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/30">
                                {transaction.userDetails.photoURL ? (
                                    <Image
                                        src={transaction.userDetails.photoURL}
                                        alt={transaction.userDetails.fullName}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-sm font-medium">
                                        {transaction.userDetails.fullName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700 truncate">
                                    {transaction.userDetails.fullName}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {transaction.userDetails.accountType}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-200">
                        <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">
                                {new Date(transaction.paymentDetails.transactionTime).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl font-bold text-primary">
                                Rp {transaction.amount.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => openTransactionDetail(transaction)}
                        className="w-full px-5 py-3.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-medium group"
                    >
                        <span>View Transaction Details</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}