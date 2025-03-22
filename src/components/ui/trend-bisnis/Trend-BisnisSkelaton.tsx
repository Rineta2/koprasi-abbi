import React from 'react'

export default function TrendBisnisSkeleton() {
    return (
        <section className="min-h-screen bg-background relative overflow-hidden py-12 md:py-20">
            <div className="container px-4 sm:px-6 lg:px-8">
                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 md:mb-16">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-200 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    <div className="w-64 h-12 md:h-14 bg-slate-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-200 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                </div>

                {/* Main Content Section Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                    {/* Text Content Skeleton */}
                    <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className="w-40 h-8 bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Description Skeleton */}
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-full h-4 bg-slate-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                ))}
                            </div>

                            {/* Feature Points Skeleton */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                                        <div className="w-24 h-4 bg-slate-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Button Skeleton */}
                        <div className="w-40 h-12 bg-slate-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                    </div>

                    {/* Image Content Skeleton */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="relative rounded-2xl overflow-hidden">
                            <div className="w-full aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}