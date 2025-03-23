import React from 'react'

export default function BackgroundElements() {
    return (
        <>
            <div className="absolute inset-0 z-0">
                {/* Left Side Modern Elements */}
                <div className="absolute left-0 inset-y-0 w-[400px]">
                    <div className="absolute top-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-400/10 via-indigo-300/10 to-cyan-200/10 rounded-full filter blur-[100px] opacity-40 animate-pulse-slow"></div>
                    <svg className="absolute top-20 left-10 w-72 h-72 opacity-[0.12]" viewBox="0 0 100 100">
                        <path d="M20,20 L80,80" stroke="currentColor" strokeWidth="0.3" className="animate-draw" />
                        <path d="M20,80 L80,20" stroke="currentColor" strokeWidth="0.3" className="animate-draw-delay" />
                        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="animate-draw" />
                    </svg>
                    <div className="absolute bottom-20 left-10 w-64 h-64 opacity-[0.15]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}>
                    </div>
                </div>

                {/* Right Side Modern Elements */}
                <div className="absolute right-0 inset-y-0 w-[400px]">
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-400/10 via-indigo-300/10 to-blue-200/10 rounded-full filter blur-[100px] opacity-40 animate-pulse-slow"></div>
                    <svg className="absolute top-40 right-10 w-80 h-80 opacity-[0.12] rotate-12" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" className="animate-morph" />
                        <path d="M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50" fill="none" stroke="currentColor" strokeWidth="0.3" className="animate-draw" />
                    </svg>
                    <svg className="absolute bottom-40 right-20 w-64 h-64 opacity-[0.12]" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="modern-lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <line x1="0" y1="0" x2="20" y2="20" stroke="currentColor" strokeWidth="0.3" />
                            </pattern>
                        </defs>
                        <circle cx="50" cy="50" r="40" fill="url(#modern-lines)" className="animate-spin-slow" />
                    </svg>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                @keyframes draw {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes morph {
                    0%, 100% { d: path('M30,50 C30,30 70,30 70,50 C70,70 30,70 30,50'); }
                    50% { d: path('M30,30 C50,30 50,70 30,70 C10,50 50,30 30,30'); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-draw {
                    stroke-dasharray: 100;
                    animation: draw 8s ease-in-out infinite;
                }
                .animate-draw-delay {
                    stroke-dasharray: 100;
                    animation: draw 8s ease-in-out infinite 2s;
                }
                .animate-morph {
                    animation: morph 15s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </>
    )
}