import React from 'react'

export default function ProgramAffiliateSkelaton() {
    return (
        <section className='min-h-full py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0b0b0d] to-[#131316]'>
            {/* Background decorative elements - sama dengan komponen utama */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute top-0 left-0 w-full opacity-[0.15]" viewBox="0 0 100 100">
                    <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="1" height="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
            </div>

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                {[1, 2].map((item) => (
                    <div key={item} className="mb-16 md:mb-24 lg:mb-32">
                        {/* Header Section Skeleton */}
                        <div className='mb-12 md:mb-16 lg:mb-20 max-w-3xl relative'>
                            <div className="h-6 w-32 bg-slate-700 rounded-lg mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                            </div>
                            <div className="h-12 w-full bg-slate-700 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                            </div>
                        </div>

                        {/* Benefits Grid Skeleton */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
                            {[1, 2, 3, 4].map((benefit) => (
                                <div key={benefit}
                                    className='backdrop-blur-sm bg-[#1c1c1f]/80 rounded-2xl p-4 sm:p-6 lg:p-8 
                                              border border-gray-800/50 relative overflow-hidden'>
                                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8'>
                                        <div className='flex-1 w-full'>
                                            <div className="h-8 w-48 bg-slate-700 rounded-lg mb-4 relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0'>
                                            <div className='w-24 h-24 bg-slate-700 rounded-xl relative overflow-hidden'>
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}