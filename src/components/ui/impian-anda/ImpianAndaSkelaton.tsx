export default function ImpianAndaSkelaton() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24">
            {/* Decorative lines */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-[2px] w-[200%] bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -rotate-45"
                            style={{
                                top: `${i * 15}%`,
                                left: `-${i * 10}%`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container relative z-10 px-4 md:px-8 lg:px-12 space-y-16">
                {/* Generate 3 skeleton items */}
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 rounded-2xl p-6 shadow-lg bg-white/5'
                    >
                        <div className="flex flex-col justify-center space-y-4 p-4">
                            <div className="relative">
                                {/* Title skeleton */}
                                <div className="h-8 bg-gray-300 rounded-lg w-3/4 animate-pulse" />
                                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>
                            {/* Description skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
                                <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse" />
                            </div>
                        </div>

                        <div className='flex items-center justify-center'>
                            {/* Image skeleton */}
                            <div className="rounded-2xl shadow-xl bg-gray-300 animate-pulse w-full h-[300px] md:h-[400px]" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}