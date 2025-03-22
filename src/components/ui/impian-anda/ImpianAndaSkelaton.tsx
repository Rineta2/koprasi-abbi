import React from 'react'

export default function ImpianAndaSkelaton() {
    return (
        <section className='py-24 md:py-32 lg:py-40 relative overflow-hidden'>
            {/* Background pattern - sama dengan komponen utama */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc20_1px,transparent_1px),linear-gradient(to_bottom,#1091cc20_1px,transparent_1px)] 
                    bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1091cc10_1px,transparent_1px),linear-gradient(to_bottom,#1091cc10_1px,transparent_1px)] 
                    bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]"></div>
            </div>

            <div className="container px-6 sm:px-8 lg:px-12 mx-auto relative z-10 max-w-[1600px]">
                {/* Header skeleton */}
                <div className="text-center mb-24 md:mb-32 max-w-3xl mx-auto">
                    <div className="h-12 w-2/3 bg-slate-200 rounded-lg mx-auto mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="h-1 w-24 md:w-32 bg-slate-200 rounded-full mx-auto mb-8"></div>
                    <div className="h-20 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-40 md:space-y-56 lg:space-y-64">
                    {[1, 2, 3].map((item, index) => (
                        <div key={item} className="py-8 md:py-12">
                            <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 xl:gap-24 items-center'>
                                {/* Content container skeleton */}
                                <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <div className="bg-background/70 backdrop-blur-sm p-8 md:p-10 lg:p-12 rounded-2xl border border-primary/10 shadow-lg">
                                        <div className="h-8 w-32 bg-slate-200 rounded-full mb-6 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
                                        <div className="h-10 w-3/4 bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
                                        <div className="w-20 h-1 bg-slate-200 rounded-full mb-8"></div>
                                        <div className="h-32 w-full bg-slate-200 rounded-lg mb-10 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
                                        <div className="space-y-5">
                                            {[1, 2, 3].map((feature) => (
                                                <div key={feature} className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                                                    <div className="h-6 w-32 bg-slate-200 rounded relative overflow-hidden">
                                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Image container skeleton */}
                                <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="relative rounded-3xl overflow-hidden shadow-xl">
                                        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[650px] bg-slate-200 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                        </div>
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