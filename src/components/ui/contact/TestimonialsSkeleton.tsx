import React from 'react'

export default function TestimonialsSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-16">
            {/* Testimonial cards skeleton */}
            <div className="space-y-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className='flex flex-col gap-6 bg-white dark:bg-gray-900 rounded-3xl p-8'>
                        {/* Rating stars skeleton */}
                        <div className='flex gap-2'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="w-6 h-6 bg-slate-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            ))}
                        </div>

                        {/* Description skeleton */}
                        <div className="h-24 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>

                        {/* Profile section skeleton */}
                        <div className='flex gap-5 items-center mt-2'>
                            {/* Profile image skeleton */}
                            <div className='relative w-20 h-20 md:w-24 md:h-24 bg-slate-200 rounded-2xl overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>

                            {/* Name and position skeleton */}
                            <div className='flex flex-col gap-2'>
                                <div className="h-8 w-48 bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                                <div className="h-6 w-32 bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}