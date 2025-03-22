import React from 'react'

export default function LegalisasiSkelaton() {
    return (
        <section className='min-h-screen bg-background relative overflow-hidden'>
            {/* Background yang sama dengan komponen utama */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--background-dark),var(--background))] opacity-70"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-dark)05_1px,transparent_1px),linear-gradient(to_bottom,var(--text-dark)05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="container mx-auto relative z-10 py-16">
                {/* Header Skeleton with Shimmer */}
                <div className='flex flex-col items-center justify-center space-y-6 mb-16'>
                    <div className='h-12 w-64 bg-slate-200 rounded-lg relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                    <div className='h-6 w-48 bg-slate-200 rounded-lg relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                </div>

                <div className='backdrop-blur-xl bg-card/95 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-border/40 max-w-[95%] sm:max-w-[90%] mx-auto'>
                    <div className='flex flex-col space-y-16'>
                        {/* Logo Skeleton with Shimmer */}
                        <div className='flex justify-center items-center'>
                            <div className='w-48 h-48 md:w-56 md:h-56 bg-slate-200 rounded-[2rem] relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </div>
                        </div>

                        {/* Registration Skeleton with Shimmer */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className="w-8 h-8 bg-slate-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-slate-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                        <div className='h-4 w-24 bg-slate-200 rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                        <div className='h-6 w-32 bg-slate-200 rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Management Skeleton with Shimmer */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className="w-8 h-8 bg-slate-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-slate-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                        <div className='h-4 w-24 bg-slate-200 rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                        <div className='h-6 w-32 bg-slate-200 rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alamat Skeleton with Shimmer */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className="w-8 h-8 bg-slate-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-slate-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-6'>
                                <div className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                    <div className='h-4 w-24 bg-slate-200 rounded mb-3 relative overflow-hidden'>
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                    <div className='h-24 w-full bg-slate-200 rounded relative overflow-hidden'>
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}