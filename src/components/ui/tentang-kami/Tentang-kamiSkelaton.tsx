export default function TentangKamiSkelaton() {
    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-background'>
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    {/* Image skeleton */}
                    <div className='relative w-full aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl flex items-center justify-center'>
                        {/* Static background pattern */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_45deg,#0000_25%,rgba(255,255,255,0.1)_50%,#0000_75%)] opacity-75" />
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_4px)]" />
                        <div className="absolute inset-0 bg-gradient-to-tl from-primary/30 via-transparent to-primary-dark/30" />

                        {/* Image placeholder */}
                        <div className="w-full h-full bg-border relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>
                    </div>

                    {/* Content skeleton */}
                    <div className='flex flex-col space-y-10 md:space-y-12'>
                        {/* Title skeleton */}
                        <div className="h-12 md:h-14 lg:h-16 bg-border rounded-lg relative overflow-hidden w-3/4">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>

                        {/* Text skeleton */}
                        <div className='flex flex-col space-y-8'>
                            <div className="space-y-4">
                                {[1, 2, 3].map((line) => (
                                    <div
                                        key={line}
                                        className="h-6 md:h-7 lg:h-8 bg-border rounded relative overflow-hidden"
                                        style={{ width: `${Math.random() * 20 + 80}%` }}
                                    >
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map((line) => (
                                    <div
                                        key={line}
                                        className="h-6 md:h-7 lg:h-8 bg-border rounded relative overflow-hidden"
                                        style={{ width: `${Math.random() * 20 + 80}%` }}
                                    >
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}