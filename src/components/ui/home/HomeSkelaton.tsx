import React from 'react'

export default function HomeSkelaton() {
    return (
        <section className='min-h-screen relative overflow-hidden flex items-center pt-6 md:pt-0 bg-gradient-to-b from-slate-50 to-white'>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_40%)] z-0" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-24 items-center">
                    <div className='flex flex-col space-y-8 sm:space-y-10'>
                        {/* Badge skeleton */}
                        <div className='w-32 h-10 bg-white/50 rounded-full relative'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>

                        {/* Heading skeleton */}
                        <div className='space-y-4'>
                            <div className='w-3/4 h-12 bg-slate-200 rounded-lg relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className='w-1/2 h-12 bg-slate-200 rounded-lg relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className='w-full h-24 bg-slate-100 rounded-lg relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        </div>

                        {/* Button skeleton */}
                        <div className='w-40 h-14 bg-slate-300 rounded-full relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
                        </div>
                    </div>

                    {/* Image skeleton */}
                    <div className='w-full h-full flex items-center justify-center mt-8 lg:mt-0'>
                        <div className="relative w-[90%] sm:w-[80%] lg:w-full aspect-square bg-slate-200 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}