import React from 'react'

export default function InsplensiasiSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-card/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
                <div className="space-y-3">
                    <div className="h-10 w-40 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                    <div className="h-6 w-72 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                </div>
                <div className="h-14 w-full sm:w-48 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
            </div>

            {/* Hero Content Skeleton */}
            <div className='w-full bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden'>
                <div className="flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-[300px] w-full bg-gradient-to-br from-gray-200/50 to-gray-300/50 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="space-y-8 max-w-2xl mx-auto">
                            <div className="space-y-6 mt-8">
                                <div className="h-10 w-96 mx-auto bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                            </div>

                            {/* SVG Placeholder */}
                            <div className="h-[500px] w-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>

                            <div className="flex justify-center gap-4 pt-8 border-t border-border/30">
                                <div className="h-12 w-32 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                                <div className="h-12 w-32 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}