import React from 'react'

export default function PartnerSkelaton() {
    return (
        <section className="py-12 md:py-20 overflow-hidden">
            <div className="container relative px-4 md:px-6">
                {/* Header skeleton */}
                <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
                    <div className="w-64 h-10 bg-slate-200 rounded-lg mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="h-1 w-20 md:w-24 bg-slate-200 rounded-full mx-auto mt-3"></div>
                    <div className="w-full h-6 bg-slate-100 rounded-lg mx-auto mt-4 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                </div>

                {/* Partners skeleton */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />

                    <div className="flex overflow-hidden py-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="flex-shrink-0 mx-3 md:mx-5 lg:mx-6 p-4 sm:p-6 md:p-8 
                                    h-28 sm:h-32 md:h-36 lg:h-40
                                    rounded-xl bg-white/[0.03] backdrop-blur-sm border border-primary/10"
                            >
                                <div className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-full 
                                    bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] 
                                        bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />
                </div>
            </div>
        </section>
    )
}