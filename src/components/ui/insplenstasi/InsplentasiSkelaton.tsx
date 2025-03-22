import React from 'react'
import Image from 'next/image'
import imgInsplentasi from "@/base/assets/insplentasi/bg.jpg"

export default function InsplentasiSkelaton() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24">
            {/* Background */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className="absolute inset-0 bg-black opacity-70" />
                <Image
                    src={imgInsplentasi}
                    alt='insplentasi'
                    className='w-full h-[120%] object-cover object-center'
                    priority
                    quality={100}
                />
            </div>

            <div className="container relative z-10 px-4 md:px-8 lg:px-12">
                <div className='flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 container 
                    backdrop-blur-md bg-black/40 p-6 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl 
                    border border-gray-300/30'>

                    {/* Title Section Skeleton */}
                    <div className='flex flex-col md:flex-row items-center justify-center gap-6 
                        bg-white/90 p-6 md:p-8 rounded-2xl relative shadow-lg w-full
                        border border-gray-300'>
                        <div className='flex flex-wrap items-center justify-center gap-6'>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className="h-10 w-64 bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Main Image Skeleton */}
                    <div className='relative w-full h-[300px] overflow-hidden rounded-2xl bg-slate-200'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* Arrow Indicator Skeleton */}
                    <div className='w-8 h-8 bg-slate-200 rounded-full relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* SVG Chart Skeleton */}
                    <div className='relative w-full max-w-4xl mx-auto h-[300px] bg-slate-200 rounded-2xl overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* Description Section Skeleton */}
                    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md 
                        rounded-xl p-6 md:p-8 border border-gray-300">
                        <div className="h-20 bg-slate-200 rounded-lg relative overflow-hidden mb-6">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                    <div className="h-4 w-32 bg-slate-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}