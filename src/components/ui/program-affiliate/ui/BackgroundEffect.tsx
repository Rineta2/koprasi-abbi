export const BackgroundElements = () => {
    return (
        <>
            {/* Decorative SVG Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid Pattern */}
                <svg className="absolute top-0 left-0 w-full opacity-[0.15]" viewBox="0 0 100 100">
                    <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="1" height="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Abstract Shapes */}
                <svg className="absolute top-20 right-0 w-64 h-64 text-purple-500/10" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M45,-65.7C58.2,-56.1,68.6,-41.7,74.1,-25.3C79.7,-8.9,80.4,9.5,74.4,25.3C68.4,41.1,55.8,54.3,41.1,63.3C26.4,72.4,9.6,77.3,-7.8,76.7C-25.2,76.1,-43.3,70,-56.2,57.4C-69.1,44.8,-76.9,25.8,-77.7,6.5C-78.5,-12.8,-72.3,-32.4,-59.7,-45.9C-47.1,-59.4,-28.1,-66.8,-9.2,-67.9C9.7,-69,31.8,-75.3,45,-65.7Z" transform="translate(100 100)" />
                </svg>

                <svg className="absolute bottom-20 left-0 w-64 h-64 text-blue-500/10" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-18.7C53.4,-3,57.5,10.1,54.6,21.8C51.7,33.5,41.8,43.8,29.8,50.9C17.8,58,3.7,61.8,-12.3,61.1C-28.3,60.3,-46.3,55,-57.3,42.6C-68.3,30.2,-72.3,10.7,-69.9,-7.2C-67.4,-25.1,-58.5,-41.4,-45.3,-51C-32.1,-60.7,-14.6,-63.7,2.5,-67.1C19.6,-70.5,39.1,-74.3,42.7,-62.9Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
            </div>
        </>
    )
}