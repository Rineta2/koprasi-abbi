export const TopLeftDecoration = () => (
    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-blue-500" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
    </div>
)

export const TopRightDecoration = () => (
    <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="url(#gradient1)" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="url(#gradient1)" strokeWidth="1" fill="none" />
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                </linearGradient>
            </defs>
        </svg>
    </div>
)

export const BottomRightDecoration = () => (
    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-20">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-purple-500" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
        </svg>
    </div>
)

export const CenterRightDecoration = () => (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/4 opacity-20">
        <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <circle cx="202" cy="202" r="200" stroke="currentColor" strokeWidth="4" className="text-blue-500" />
            <circle cx="202" cy="202" r="150" stroke="currentColor" strokeWidth="4" className="text-purple-500" />
            <circle cx="202" cy="202" r="100" stroke="currentColor" strokeWidth="4" className="text-blue-500" />
        </svg>
    </div>
)