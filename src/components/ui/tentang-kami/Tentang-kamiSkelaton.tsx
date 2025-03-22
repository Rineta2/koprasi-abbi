import React from 'react'

export default function TentangKamiSkelaton() {
    return (
        <section className='relative py-16 md:py-24 lg:py-32 flex items-center overflow-hidden bg-gradient-to-b from-background to-background/95'>
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                {/* Section header skeleton */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <div className='w-3/4 h-12 bg-slate-200 rounded-lg mx-auto relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="h-1 w-20 md:w-24 bg-slate-200 rounded-full mx-auto my-6"></div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center'>
                    {/* Image skeleton */}
                    <div className='lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl'>
                        <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                    </div>

                    {/* Content skeleton */}
                    <div className='lg:col-span-7 flex flex-col space-y-6 md:space-y-8'>
                        <div className='space-y-6'>
                            <div className='w-full h-24 bg-slate-200 rounded-lg relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className='w-full h-24 bg-slate-200 rounded-lg relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>

                        {/* Feature highlights skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                                    <div className="w-24 h-5 bg-slate-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-slate-100/50 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-slate-100/50 rounded-full filter blur-3xl"></div>
            </div>
        </section>
    )
}