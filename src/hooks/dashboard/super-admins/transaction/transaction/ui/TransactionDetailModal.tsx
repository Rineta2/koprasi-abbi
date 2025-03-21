import Image from 'next/image'
import Link from 'next/link'
import { TransactionType } from '../lib/transaction'

interface TransactionDetailModalProps {
    transaction: TransactionType | null;
}

export function TransactionDetailModal({ transaction }: TransactionDetailModalProps) {
    if (!transaction) return null;

    return (
        <dialog id="transaction_detail_modal" className="modal">
            <div className="modal-box bg-white max-w-4xl p-0 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                            Transaction Details
                        </h3>
                        <form method="dialog">
                            <button className="btn btn-ghost btn-sm btn-circle">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Order Information */}
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4 hover:bg-gray-50/80 transition-colors duration-200">
                        <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Order Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                <p className="font-medium text-gray-900">{transaction.orderId}</p>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                                <p className="font-medium text-gray-900">{transaction.paymentDetails.transactionId}</p>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-block ${transaction.status === 'success'
                                    ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                                    : transaction.status === 'pending'
                                        ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                                    }`}>
                                    {transaction.status === 'success'
                                        ? 'Success'
                                        : transaction.status === 'pending'
                                            ? 'Pending'
                                            : 'Cancelled'}
                                </span>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 mb-1">Transaction Date</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(transaction.paymentDetails.transactionTime).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4 hover:bg-gray-50/80 transition-colors duration-200">
                        <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Product Details
                        </h4>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="flex gap-6">
                                <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={transaction.productDetails.image}
                                        alt={transaction.productDetails.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-xl font-semibold text-gray-900">{transaction.productDetails.title}</h5>
                                    <p className="text-primary font-bold text-2xl mt-3">
                                        Rp {transaction.productDetails.price.toLocaleString('id-ID')}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.productDetails.status === 'premium'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-blue-50 text-blue-700'
                                            }`}>
                                            {transaction.productDetails.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Payment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Details */}
                        <div className="bg-gray-50 p-6 rounded-2xl space-y-4 hover:bg-gray-50/80 transition-colors duration-200 h-fit">
                            <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Customer Details
                            </h4>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10">
                                        {transaction.userDetails.photoURL ? (
                                            <Image
                                                src={transaction.userDetails.photoURL}
                                                alt={transaction.userDetails.fullName}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl font-medium">
                                                {transaction.userDetails.fullName.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-900">{transaction.userDetails.fullName}</h5>
                                        <p className="text-gray-500">{transaction.userDetails.email}</p>
                                        <p className="text-sm mt-1 text-primary font-medium">
                                            {transaction.userDetails.accountType} Account
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-gray-50 p-6 rounded-2xl space-y-4 hover:bg-gray-50/80 transition-colors duration-200">
                            <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Payment Details
                            </h4>
                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-semibold text-gray-900 mt-1">{transaction.paymentDetails.paymentType}</p>
                                </div>

                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <p className="text-sm text-gray-500">Bank</p>
                                    <p className="font-bold text-xl text-primary mt-1 uppercase">
                                        {transaction.paymentDetails.vaNumbers.map(va => va.bank).join(', ')}
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <p className="text-sm text-gray-500">Amount</p>
                                    <p className="font-bold text-xl text-primary mt-1">
                                        Rp {Number(transaction.paymentDetails.grossAmount).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Link */}
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4 hover:bg-gray-50/80 transition-colors duration-200">
                        <h4 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6m0 0l-3-3m3 3l3-3m-3-3v6" />
                            </svg>
                            Actions Link
                        </h4>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <Link href={transaction.transactionLink} target="_blank" className="text-primary font-medium">
                                {transaction.transactionLink}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <form method="dialog" className="flex justify-end">
                        <button className="btn btn-primary min-w-[120px]">
                            Close
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}