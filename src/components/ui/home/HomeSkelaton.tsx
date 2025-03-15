import React from 'react'

export default function HomeSkelaton() {
    return (
        <section className='min-h-screen relative overflow-hidden flex items-center mt-20 sm:mt-0'>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/50 dark:from-background-dark/5 dark:to-background-dark/50 z-0" />

            <div className="container px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className='flex flex-col space-y-8'>
                        {/* Title badge skeleton */}
                        <div className='w-32 h-10 bg-border rounded-full relative overflow-hidden'>
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>

                        {/* Heading skeletons */}
                        <div className='space-y-4'>
                            <div className='h-12 bg-border rounded relative overflow-hidden w-3/4'>
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                            <div className='h-12 bg-border rounded relative overflow-hidden w-2/3'>
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className='h-20 bg-border rounded relative overflow-hidden w-full max-w-xl'>
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>

                        {/* Button skeleton */}
                        <div className='w-40 h-14 bg-border rounded-full relative overflow-hidden'>
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>
                    </div>

                    {/* Image skeleton */}
                    <div className='w-full h-full flex items-center justify-center animate-float'>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-dark/20 blur-3xl rounded-full" />
                            <div className="relative z-10 w-[600px] h-[600px] bg-border rounded-lg overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}