export default function TrendBisnisSkeleton() {
    return (
        <section className="relative min-h-screen py-12 md:py-20 overflow-hidden">
            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 md:mb-16">
                    {/* Garuda image skeleton */}
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-border rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                    </div>

                    {/* Title skeleton */}
                    <div className="h-12 md:h-14 lg:h-16 bg-border rounded-lg relative overflow-hidden w-1/2">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                    </div>

                    {/* Coin image skeleton */}
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-border rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left content */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        {/* Icon skeleton */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-border rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((line) => (
                                <div
                                    key={line}
                                    className="h-6 md:h-7 bg-border rounded relative overflow-hidden"
                                    style={{ width: `${Math.random() * 20 + 80}%` }}
                                >
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right content - Image skeleton */}
                    <div className="order-1 lg:order-2">
                        <div className="relative w-full aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl">
                            <div className="absolute inset-0 bg-border">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-border via-card to-border"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}