import React from 'react'

export default function AssetsSkelaton() {
    return (
        <section className='min-h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            {/* Header Section Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6 mb-8 bg-card/20 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-border/40">
                <div className="space-y-3">
                    <div className="h-10 w-40 bg-background-dark/70 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                    <div className="h-6 w-72 bg-background-dark/70 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="h-14 w-full sm:w-48 bg-background-dark/40 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-text/5 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Hero Content Skeleton */}
            <div className='w-full bg-card/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 overflow-hidden mb-6'>
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                    {/* Content Section */}
                    <div className="p-8 lg:p-10 flex flex-col flex-grow backdrop-blur-md bg-card/20">
                        <div className="space-y-6 flex-grow">
                            <div className="h-12 w-3/4 bg-background-dark/70 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                            </div>

                            <div className="space-y-3">
                                <div className="h-6 w-full bg-background-dark/70 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                                <div className="h-6 w-5/6 bg-background-dark/70 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                                <div className="h-6 w-4/6 bg-background-dark/70 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-24 h-24 mx-auto my-6 bg-background-dark/40 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-text/5 to-transparent"></div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 mt-auto border-t border-border/40">
                            <div className="h-11 w-11 bg-background-dark/40 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-text/5 to-transparent"></div>
                            </div>
                            <div className="h-11 w-11 bg-background-dark/40 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-text/5 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-[300px] lg:h-full bg-background-dark/70 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}