import React from 'react'

export default function TransactionSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section */}
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/20 p-6 sm:p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <div className="h-10 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-5 w-64 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-7 w-40 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Button */}
            <div className="mb-8">
                <div className="h-10 w-36 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* Transaction Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
                        <div className="p-4 sm:p-6 space-y-4">
                            <div className="flex gap-4">
                                <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="h-6 w-full bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-5 w-20 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-32 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                                <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-8 w-20 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}