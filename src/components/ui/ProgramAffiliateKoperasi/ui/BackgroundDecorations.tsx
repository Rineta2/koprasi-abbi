export default function BackgroundDecorations() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Top Left Blob */}
            <svg className="absolute -left-24 -top-24 w-96 h-96 text-blue-50 opacity-70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M44.5,-76.3C59.2,-69.6,73.7,-60.2,83.4,-46.9C93.1,-33.6,98,-16.8,96.6,-0.8C95.2,15.2,87.5,30.4,77.8,43.2C68.1,56,56.4,66.4,42.8,73.3C29.1,80.2,14.6,83.6,-0.7,84.8C-16,86,-32,85,-46.8,78.5C-61.6,72,-75.2,60,-83.1,45.3C-91,30.6,-93.2,13.3,-91.7,-3.3C-90.2,-19.9,-85,-35.8,-75.6,-48.4C-66.2,-61,-52.6,-70.3,-38.5,-77.5C-24.4,-84.7,-9.7,-89.8,3.7,-86.1C17.2,-82.4,34.4,-69.9,44.5,-76.3Z" transform="translate(100 100)" />
            </svg>

            {/* Top Right Circles */}
            <svg className="absolute -right-16 top-20 w-72 h-72 text-violet-50 opacity-70" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="currentColor" />
            </svg>

            {/* Bottom Left Rings */}
            <svg className="absolute left-20 bottom-40 w-64 h-64 text-cyan-50 opacity-70" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="8" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="8" />
            </svg>

            {/* Bottom Right Dots Pattern */}
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-30">
                <div className="absolute inset-0 grid grid-cols-6 gap-4">
                    {[...Array(36)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}