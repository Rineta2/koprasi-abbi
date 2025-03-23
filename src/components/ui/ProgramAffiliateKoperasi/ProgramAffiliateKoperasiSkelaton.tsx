import React from 'react'

export default function ProgramAffiliateSkelaton() {
    return (
        <section className='min-h-screen py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
            {/* Decorative SVG Elements - sama dengan komponen utama */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left Blob */}
                <svg className="absolute -left-24 -top-24 w-96 h-96 text-blue-50 opacity-70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M44.5,-76.3C59.2,-69.6,73.7,-60.2,83.4,-46.9C93.1,-33.6,98,-16.8,96.6,-0.8C95.2,15.2,87.5,30.4,77.8,43.2C68.1,56,56.4,66.4,42.8,73.3C29.1,80.2,14.6,83.6,-0.7,84.8C-16,86,-32,85,-46.8,78.5C-61.6,72,-75.2,60,-83.1,45.3C-91,30.6,-93.2,13.3,-91.7,-3.3C-90.2,-19.9,-85,-35.8,-75.6,-48.4C-66.2,-61,-52.6,-70.3,-38.5,-77.5C-24.4,-84.7,-9.7,-89.8,3.7,-86.1C17.2,-82.4,34.4,-69.9,44.5,-76.3Z" transform="translate(100 100)" />
                </svg>
                {/* Sisanya sama dengan komponen utama */}
            </div>

            <div className='container px-4 mx-auto max-w-7xl relative'>
                {/* Header Section Skeleton */}
                <div className="text-center mb-20 relative">
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 mb-6">
                        <div className="h-6 w-32 bg-slate-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                        </div>
                    </div>
                    <div className="h-16 w-3/4 mx-auto bg-slate-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    </div>
                </div>

                {/* Benefits Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="h-full rounded-[2rem] bg-white p-6 border border-gray-100">
                            {/* Image Skeleton */}
                            <div className="mb-8 overflow-hidden rounded-[1.5rem]">
                                <div className="relative w-full pt-[75%] bg-slate-200 overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                                </div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="h-8 w-2/3 bg-slate-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                                    </div>
                                </div>
                                <div className="h-6 w-1/3 bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                                </div>
                                <div className="h-24 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}