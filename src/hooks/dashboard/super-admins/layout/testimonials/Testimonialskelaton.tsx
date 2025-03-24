import React from 'react'

export default function TestimonialsSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        <div className="h-4 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                    </div>
                    <div className="h-12 w-36 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Content Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden">
                        {/* Image Skeleton */}
                        <div className="relative w-full h-72 bg-gradient-to-r from-gray-200 to-gray-300">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <div className="p-6">
                            {/* Rating Skeleton */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                ))}
                            </div>

                            {/* Description Skeleton */}
                            <div className="space-y-2 mb-4">
                                <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>

                            {/* Author Info Skeleton */}
                            <div className="border-t pt-4">
                                <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="flex justify-end gap-3 mt-4">
                                <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}