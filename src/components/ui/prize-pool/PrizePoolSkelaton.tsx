import React from 'react'

export default function PrizePoolSkeleton() {
    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-32 relative overflow-hidden'>
            {/* Top Left Decoration */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
                    <defs>
                        <pattern id="skeleton-pattern-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" className="text-blue-500" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#skeleton-pattern-1)" />
                </svg>
            </div>

            {/* Background pattern - sama dengan komponen utama */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc20_1px,transparent_1px),linear-gradient(to_bottom,#1091cc20_1px,transparent_1px)] 
                    bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc10_1px,transparent_1px),linear-gradient(to_bottom,#1091cc10_1px,transparent_1px)] 
                    bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>
            </div>

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className='flex flex-col md:flex-row items-center justify-center gap-8 mb-24 last:mb-0'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full'>
                            <div className="space-y-8 md:pr-6">
                                <div className="h-12 bg-slate-200 rounded-lg w-3/4 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-1.5 w-24 bg-slate-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                    <div className="w-7 h-7 bg-slate-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="w-full aspect-square bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-200 rounded overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}