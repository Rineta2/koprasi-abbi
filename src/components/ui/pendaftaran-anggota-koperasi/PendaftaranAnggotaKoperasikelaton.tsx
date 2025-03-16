export default function AssetsSkeleton() {
    return (
        <section className="relative min-h-screen overflow-hidden py-12 md:py-24 bg-gradient-to-b from-background via-background/90 to-background/50">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="flex flex-col space-y-8">
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/10 relative overflow-hidden"
                        >
                            {/* Card Decorative Elements */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
                                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:16px_16px]" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                <div className="flex-1 space-y-8">
                                    {/* Title skeleton */}
                                    <div className="h-12 bg-white/10 rounded-lg relative overflow-hidden w-3/4">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>

                                    {/* Description skeleton */}
                                    <div className="space-y-4">
                                        {[1, 2].map((line) => (
                                            <div
                                                key={line}
                                                className="h-6 bg-white/10 rounded-lg relative overflow-hidden"
                                                style={{ width: `${Math.random() * 20 + 80}%` }}
                                            >
                                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Button skeleton */}
                                    <div className="w-40 h-12 bg-white/10 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </div>
                                </div>

                                <div className="flex gap-8 items-center">
                                    {/* Image skeletons */}
                                    {[1, 2].map((img) => (
                                        <div
                                            key={img}
                                            className="w-[240px] h-[240px] bg-white/10 rounded-2xl relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}