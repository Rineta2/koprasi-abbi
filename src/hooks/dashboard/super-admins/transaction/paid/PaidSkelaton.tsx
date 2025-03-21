import React from 'react'

export default function PaidSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header Skeleton */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <div className="h-8 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-72 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-40 h-12 bg-gray-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Filter Section Skeleton */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="h-11 bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transactions Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-100/50 p-6 shadow-lg">
                        <div className="space-y-6">
                            {/* Image Skeleton */}
                            <div className="relative w-full h-56 bg-gray-200 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* User Info Skeleton */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div>
                                        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-6 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Details Skeleton */}
                            <div className="space-y-3 bg-slate-50/50 rounded-2xl p-4">
                                {[...Array(3)].map((_, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}

                                {/* Button Skeleton */}
                                <div className="w-full h-10 mt-4 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
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