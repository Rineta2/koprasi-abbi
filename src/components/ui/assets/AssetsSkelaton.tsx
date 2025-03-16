export default function AssetsSkeleton() {
    return (
        <section className="relative min-h-full overflow-hidden py-24 bg-gradient-to-b from-background via-background/90 to-background/50">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="space-y-32">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="group">
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                                <div className='flex flex-col gap-8 p-6 rounded-2xl bg-background/5 backdrop-blur-sm'>
                                    {/* Title skeleton */}
                                    <div className="h-12 bg-border rounded-lg relative overflow-hidden w-3/4">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>

                                    {/* Description skeleton */}
                                    <div className="space-y-4">
                                        {[1, 2].map((line) => (
                                            <div
                                                key={line}
                                                className="h-6 bg-border rounded relative overflow-hidden"
                                                style={{ width: `${Math.random() * 20 + 80}%` }}
                                            >
                                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Icon skeleton */}
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-border rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                </div>

                                {/* Image skeleton */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <div className="w-full h-[500px] bg-border relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}