export const FloatingElements = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Animated circles with enhanced glow effect */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse 
                after:content-[''] after:absolute after:inset-0 
                after:bg-primary/20 after:rounded-full after:blur-2xl 
                after:animate-ping after:animation-delay-2000"></div>
            <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse 
                after:content-[''] after:absolute after:inset-0 
                after:bg-primary/20 after:rounded-full after:blur-2xl 
                after:animate-ping after:animation-delay-1000"></div>

            {/* Modern grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#8882_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Geometric shapes */}
            <div className="absolute top-1/4 right-[15%] w-24 h-24 border-4 border-primary/10 rounded-xl rotate-12 animate-spin-slow"></div>
            <div className="absolute bottom-1/4 left-[10%] w-16 h-16 border-4 border-primary/10 rounded-full animate-bounce-slow"></div>
        </div>
    )
}