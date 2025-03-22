import React from 'react'

export default function AssetsSkeleton() {
    return (
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95 -z-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-5"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-5"></div>

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                {/* Section header skeleton */}
                <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
                    <div className="h-12 w-64 bg-slate-200 rounded-lg mx-auto mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="h-1 w-20 md:w-24 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    <div className="h-6 w-96 max-w-full bg-slate-200 rounded-lg mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                </div>

                {/* Assets items skeleton */}
                <div className="space-y-20 md:space-y-28">
                    {[1, 2, 3].map((item, index) => (
                        <div key={item} className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
                            {/* Content section skeleton */}
                            <div className={`flex flex-col lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                {/* Icon skeleton */}
                                <div className="mb-6 inline-flex">
                                    <div className="p-3 bg-slate-200 rounded-xl w-16 h-16 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                    </div>
                                </div>

                                {/* Title skeleton */}
                                <div className="h-8 w-64 bg-slate-200 rounded-lg mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>

                                {/* Description skeleton */}
                                <div className="h-24 w-full bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>

                                {/* Tags skeleton */}
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3].map((tag) => (
                                        <div key={tag} className="w-24 h-8 bg-slate-200 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image section skeleton */}
                            <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                                    <div className="w-full aspect-[16/9] md:aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
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