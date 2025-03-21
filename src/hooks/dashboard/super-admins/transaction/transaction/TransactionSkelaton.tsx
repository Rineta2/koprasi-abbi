import React from 'react'

export default function TransactionSkelaton() {
    return (
        <section className='min-h-screen py-0 px-0'>
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-white to-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-40 h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Filters Skeleton */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-14 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                ))}
            </div>

            {/* Transactions Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6">
                        {/* Status Badge */}
                        <div className="flex justify-end mb-4">
                            <div className="w-20 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex items-start gap-5">
                            <div className="w-28 h-28 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="flex-1">
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* User Info */}
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-gray-200 rounded-lg mb-1 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-3 w-20 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Details */}
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-12 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-10 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}