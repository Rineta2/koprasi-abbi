import React from 'react'

export default function SecuritySkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-2">
            {/* Header Section Skeleton */}
            <div className="bg-background/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/20 p-8 mb-8">
                <div className="space-y-1">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-5 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="bg-background/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100/10 p-10">
                <div className="grid gap-6">
                    {/* Data Protection Card Skeleton */}
                    <div className="p-6 border-gray-100 rounded-xl bg-background/40 backdrop-blur-2xl shadow-2xl border-gray-100/10">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100/50 rounded-lg w-12 h-12 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100"></div>
                            </div>
                            <div className="flex-1">
                                <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delete Account Card Skeleton */}
                    <div className="p-6 border border-red-200/50 rounded-xl bg-red-50/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-red-100/50 rounded-lg w-12 h-12 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-red-100 via-red-50 to-red-100"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-32 h-10 bg-red-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-red-200 via-red-100 to-red-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}