export default function BackgroundEffects() {
    return (
        <div className="absolute inset-0 w-full h-full z-0">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f8fafc,#ffffff)] opacity-70"></div>

            {/* Animated grid with fade */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,145,204,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,145,204,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(16,145,204,0.1),transparent)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,rgba(16,145,204,0.05),transparent)]"></div>
            </div>

            {/* Modern geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

            {/* Floating elements */}
            <div className="absolute top-1/3 left-1/2 w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent rotate-45 animate-float-slow"></div>
            <div className="absolute top-2/3 right-1/3 w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent -rotate-45 animate-float"></div>

            {/* Glowing dots */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_4px_rgba(16,145,204,0.3)] animate-glow"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_4px_rgba(16,145,204,0.3)] animate-glow-delayed"></div>
        </div>
    )
}