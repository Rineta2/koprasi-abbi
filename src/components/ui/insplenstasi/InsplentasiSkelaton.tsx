export default function InsplentasiSkelaton() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24">
            {/* Background skeleton */}
            <div className='absolute top-0 left-0 w-full h-full bg-gray-800' />

            <div className="container relative z-10 px-4 md:px-8 lg:px-12">
                <div className='flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto backdrop-blur-md bg-white/20 p-6 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl'>
                    {/* Title section skeleton */}
                    <div className='flex flex-col md:flex-row items-center justify-center gap-6 bg-white/95 p-6 md:p-8 rounded-2xl relative'>
                        <div className='flex flex-wrap items-center justify-center gap-6'>
                            {/* Garuda skeleton */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full animate-pulse" />
                            {/* Title skeleton */}
                            <div className="h-8 md:h-10 bg-gray-300 rounded-lg w-48 md:w-64 animate-pulse" />
                            {/* Coin skeleton */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Main image skeleton */}
                    <div className='relative w-full overflow-hidden rounded-2xl bg-white/95 shadow-xl'>
                        <div className="w-full aspect-video bg-gray-300 animate-pulse" />
                    </div>

                    {/* Arrow skeleton */}
                    <div className='flex items-center justify-center'>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded animate-pulse" />
                    </div>

                    {/* SVG image skeleton */}
                    <div className='relative w-full max-w-4xl mx-auto'>
                        <div className="w-full aspect-[2/1] bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}