import React from 'react'

export default function PartnerSkelaton() {
    return (
        <div className="container relative px-4 md:px-6">
            {/* Title skeleton */}
            <div className="relative text-center mb-12 md:mb-16">
                <div className="w-64 h-8 md:h-10 mx-auto bg-border rounded relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                </div>
                <div className="absolute w-24 md:w-32 h-1 bg-border rounded-full bottom-[-0.75rem] md:bottom-[-1rem] left-1/2 -translate-x-1/2"></div>
            </div>

            {/* Gradient edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />

            {/* Partner logos skeleton */}
            <div className="flex items-center gap-6 md:gap-12">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-center p-4 md:p-8 
                        rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08]
                        backdrop-blur-xl border border-white/10"
                    >
                        <div className="w-[120px] md:w-[160px] h-[60px] md:h-[80px] bg-border relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background via-background/95 to-transparent z-10" />
        </div>
    );
}