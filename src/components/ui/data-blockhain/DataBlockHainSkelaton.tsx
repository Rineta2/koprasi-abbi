import React from 'react'

export default function DataBlockHainSkelaton() {
    return (
        <section className='min-h-full relative overflow-hidden flex items-center justify-center py-10 sm:py-20'>
            {/* Modern Decorative SVG Elements - keeping same background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* ... existing code ... */}
            </div>

            {/* Enhanced gradient overlay - matching main component */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/90 
                          dark:from-background-dark/0 dark:via-background-dark/10 dark:to-background-dark/90 
                          backdrop-blur-[2px] z-0" />

            <div className="container px-4 sm:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 xl:gap-16 items-center">
                        {/* Image Skeleton */}
                        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-30 blur-2xl"></div>
                            <div className="relative w-full aspect-square bg-border">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="space-y-4 sm:space-y-6 p-4 sm:p-8 bg-white/5 dark:bg-gray-800/20 backdrop-blur-md 
                                    rounded-2xl sm:rounded-3xl border border-gray-200/10">
                            {/* Title Skeleton */}
                            <div className="h-12 sm:h-14 md:h-16 bg-border rounded-lg relative overflow-hidden w-3/4">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>

                            {/* Decorative elements matching main component */}
                            <div className="absolute -top-2 -left-2 w-4 h-4">
                                <div className="w-1 h-1 bg-primary/20 rounded-full absolute top-0 left-0"></div>
                                <div className="w-1 h-1 bg-primary/20 rounded-full absolute top-0 right-0"></div>
                                <div className="w-1 h-1 bg-primary/20 rounded-full absolute bottom-0 left-0"></div>
                                <div className="w-1 h-1 bg-primary/20 rounded-full absolute bottom-0 right-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}