import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-2">
            {/* Header Section Skeleton */}
            <div className="bg-background/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/20 dark:border-gray-800/30 p-8 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2">
                        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                    </div>
                    <div className="w-full sm:w-32 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="bg-background/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100/10 dark:border-gray-800/30 p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Profile Image Skeleton */}
                    <div className="flex flex-col items-center space-y-8 order-1 lg:order-2">
                        <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden ring-4 ring-indigo-50">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                        </div>
                    </div>

                    {/* Form Fields Skeleton */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="space-y-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="group p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                                    <div className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                    </div>
                                    <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}