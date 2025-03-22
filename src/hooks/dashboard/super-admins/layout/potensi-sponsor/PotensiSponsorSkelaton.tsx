import React from 'react'

export default function ProgramAffliateSkelaton() {
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

            {/* Content Card Skeleton */}
            <div className="space-y-6">
                {[1, 2].map((item) => (
                    <div key={item} className="bg-white rounded-2xl shadow-md p-6">
                        <div className="h-7 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        <div className="h-16 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-8 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        {/* Benefits Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((benefit) => (
                                <div key={benefit} className="bg-gray-50 rounded-xl p-4">
                                    <div className="aspect-square w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                    <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <div className="h-10 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                            <div className="h-10 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}