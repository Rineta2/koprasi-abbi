import React from 'react'

export default function SisaHasilUsahaSkelaton() {
    return (
        <section className='min-h-screen relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-background/95'>
            {/* Background skeleton */}
            <div className='absolute inset-0 w-full h-full -z-10 bg-slate-900' />

            {/* Wave decoration skeleton - top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden opacity-20 h-32 md:h-40 bg-slate-800" />

            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Multiple cards skeleton */}
                {[1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 lg:p-12 border border-white/20 shadow-2xl mb-12 last:mb-0"
                    >
                        {/* Title skeleton */}
                        <div className='w-3/4 h-12 bg-slate-700 rounded-lg mx-auto mb-6 relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                        </div>

                        {/* Text skeleton */}
                        <div className='w-full h-8 bg-slate-700 rounded-lg mx-auto mb-8 relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                        </div>

                        {/* Image skeleton */}
                        <div className="relative mb-8 overflow-hidden rounded-2xl h-[250px] bg-slate-700">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                        </div>

                        {/* Description skeleton */}
                        <div className='w-full h-24 bg-slate-700 rounded-lg relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Wave decoration skeleton - bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20 rotate-180 h-32 md:h-40 bg-slate-800" />
        </section>
    )
}