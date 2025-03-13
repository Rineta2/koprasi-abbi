import React from 'react'

export default function AddressSkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-2">
            {/* Header Section Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background dark:bg-background-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <div className="space-y-1">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                    </div>
                </div>
            </div>

            {/* User Info Card Skeleton */}
            <div className="mb-8 p-6 bg-background dark:bg-background-dark rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="p-4 bg-background-dark dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                            </div>
                            <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Family Info Card Skeleton */}
            <div className="mb-8 p-6 bg-background dark:bg-background-dark rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                            </div>
                            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address Cards Skeleton */}
            {[...Array(2)].map((_, index) => (
                <div key={index} className="mb-8 p-6 bg-background dark:bg-background-dark rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                </div>
                                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                </div>
                            </div>
                        </div>
                        {/* Added timestamp skeleton */}
                        <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(5)].map((_, fieldIndex) => (
                            <div key={fieldIndex} className={`space-y-2 ${fieldIndex === 4 ? 'md:col-span-2' : ''}`}>
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                </div>
                                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}