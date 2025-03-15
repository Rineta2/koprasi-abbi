import React from 'react'

export default function LegalisasiSkelaton() {
    return (
        <section className='min-h-screen bg-background relative overflow-hidden'>
            {/* Modern tech background - same as main component */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--background-dark),var(--background))] opacity-70"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-dark)05_1px,transparent_1px),linear-gradient(to_bottom,var(--text-dark)05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--primary)20,transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,var(--primary-dark)20,transparent)]"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl relative z-10 py-16">
                {/* Header Section Skeleton */}
                <div className='flex flex-col items-center justify-center space-y-6 mb-16'>
                    <div className='w-96 h-12 bg-border rounded-lg relative overflow-hidden'>
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                    </div>
                    <div className='w-72 h-8 bg-border rounded-lg relative overflow-hidden'>
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                    </div>
                </div>

                {/* Main Content Card Skeleton */}
                <div className='backdrop-blur-xl bg-card/95 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-border/40'>
                    <div className='flex flex-col space-y-16'>
                        {/* Logo Skeleton */}
                        <div className='flex justify-center items-center'>
                            <div className='w-48 h-48 md:w-56 md:h-56 bg-border rounded-[2rem] relative overflow-hidden'>
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                        </div>

                        {/* Registration Section Skeleton */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className='w-8 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                                <div className='w-48 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                        <div className='w-32 h-5 bg-border rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                        </div>
                                        <div className='w-full h-6 bg-border rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Management Section Skeleton */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className='w-8 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                                <div className='w-48 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                        <div className='w-32 h-5 bg-border rounded mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                        </div>
                                        <div className='w-full h-6 bg-border rounded relative overflow-hidden'>
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Address Section Skeleton */}
                        <div>
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <div className='w-8 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                                <div className='w-48 h-8 bg-border rounded relative overflow-hidden'>
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-6'>
                                <div className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg border border-border/30'>
                                    <div className='w-32 h-5 bg-border rounded mb-3 relative overflow-hidden'>
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                    <div className='w-full h-24 bg-border rounded relative overflow-hidden'>
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}