import React from 'react'

export default function PendaftaranAnggotaKoperasiSkeleton() {
    return (
        <section className="relative min-h-screen overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/90 to-background/50">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="flex flex-col space-y-10 md:space-y-12 lg:space-y-16">
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg border border-white/10 relative overflow-hidden"
                        >
                            {/* Card Decorative Elements */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
                                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:16px_16px]" />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
                                <div className="flex-1 space-y-6 md:space-y-8">
                                    {/* Title skeleton */}
                                    <div className="h-12 w-3/4 bg-slate-200/20 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent" />
                                    </div>

                                    {/* Description skeleton */}
                                    <div className="h-24 w-full bg-slate-200/20 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent" />
                                    </div>

                                    {/* Button skeleton */}
                                    <div className="h-12 w-40 bg-slate-200/20 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent" />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                                    {/* Image skeletons */}
                                    <div className="w-full sm:w-[200px] md:w-[240px] h-[240px] bg-slate-200/20 rounded-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent" />
                                    </div>
                                    <div className="w-full sm:w-[200px] md:w-[240px] h-[240px] bg-slate-200/20 rounded-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}