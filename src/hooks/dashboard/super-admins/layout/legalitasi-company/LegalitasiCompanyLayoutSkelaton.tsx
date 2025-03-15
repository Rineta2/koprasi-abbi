import React from 'react'

export default function LegalitasiCompanySkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-card/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
                <div className="space-y-3">
                    <div className="h-10 w-64 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
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

            {/* Main Content Skeleton */}
            <div className='w-full bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10'>
                {/* Image Section */}
                <div className="relative h-[400px] bg-gradient-to-br from-gray-200/50 to-gray-300/50 overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                    <div className="space-y-8 relative z-10 max-w-3xl mx-auto w-full">
                        {/* Company Name & Legal Type */}
                        <div className="space-y-4 text-center">
                            <div className="h-12 w-2/3 mx-auto bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className="h-10 w-1/2 mx-auto bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Registration Numbers */}
                        <div className='space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                            <div className="h-8 w-48 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-20 bg-gradient-to-r from-gray-200/60 to-gray-300/60 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                        <div className="h-6 w-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Management */}
                        <div className='space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                            <div className="h-8 w-36 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-20 bg-gradient-to-r from-gray-200/60 to-gray-300/60 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                        <div className="h-6 w-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Address */}
                        <div className='space-y-4 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10'>
                            <div className="h-8 w-28 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className="space-y-2 text-center">
                                <div className="h-6 w-3/4 mx-auto bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                                <div className="h-6 w-1/2 mx-auto bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10 justify-center">
                            <div className="h-14 w-32 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className="h-14 w-32 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}