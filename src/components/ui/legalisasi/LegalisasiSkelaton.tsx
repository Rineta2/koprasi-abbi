import React from 'react'

export default function LegalisasiSkelaton() {
    return (
        <section className='min-h-screen bg-background relative overflow-hidden'>
            {/* Modern tech background - sama seperti komponen utama */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Gradient mesh background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f8fafc,#ffffff)] opacity-70"></div>

                {/* Animated grid with fade */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,145,204,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,145,204,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(16,145,204,0.1),transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,rgba(16,145,204,0.05),transparent)]"></div>
                </div>

                {/* Modern geometric shapes */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="container mx-auto relative z-10 py-16">
                {/* Header Skeleton */}
                <div className='flex flex-col items-center justify-center space-y-6 mb-16'>
                    <div className="relative">
                        <div className='h-14 w-72 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/5 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
                    </div>

                    <div className="relative">
                        <div className='h-10 w-56 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full border border-gray-200 shadow-sm relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                        </div>
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-md -z-10"></div>
                    </div>

                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full"></div>
                </div>

                <div className='backdrop-blur-xl bg-white/95 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-200 max-w-[95%] sm:max-w-[90%] mx-auto'>
                    <div className='flex flex-col space-y-16'>
                        {/* Logo Skeleton */}
                        <div className='flex justify-center items-center'>
                            <div className='w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2rem] relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                            </div>
                        </div>

                        {/* Registration Skeleton */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 group'>
                                        <div className='h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                        </div>
                                        <div className='h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Management Section - menggunakan pola yang sama */}
                        <div>
                            {/* Header sama seperti Registration */}
                            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                            </div>

                            {/* Grid sama seperti Registration */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((index) => (
                                    <div key={index} className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 group'>
                                        <div className='h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                        </div>
                                        <div className='h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alamat Section */}
                        <div>
                            {/* Header sama seperti sections lain */}
                            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-100 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                                <div className='h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                            </div>

                            <div className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 group'>
                                <div className='h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-3 relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                                <div className='h-24 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}