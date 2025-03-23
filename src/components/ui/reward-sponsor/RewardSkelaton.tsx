import React from 'react'

export default function RewardSkelaton() {
    return (
        <section className='min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50'>
            {/* Abstract Background Patterns */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                {/* Header Section Skeleton */}
                <div className="text-center mb-16">
                    <div className="h-12 w-48 bg-slate-200 rounded-lg mx-auto mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="w-24 h-1 bg-slate-200 mx-auto rounded-full mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                    <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-8 lg:gap-12'>
                    {/* Left Column Skeleton */}
                    <div className="h-full w-full bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-100">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={`left-${item}`} className="flex items-center gap-3 p-4 mb-4">
                                <div className="w-2 h-2 rounded-full bg-slate-200 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                                <div className="h-6 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center Image Skeleton */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20" />
                        <div className="relative p-2 bg-white rounded-3xl shadow-2xl">
                            <div className="w-[500px] h-[500px] bg-slate-200 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="h-full w-full bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-100">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={`right-${item}`} className="flex items-center gap-3 p-4 mb-4">
                                <div className="w-2 h-2 rounded-full bg-slate-200 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                                <div className="h-6 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements Section Skeleton */}
                <div className="mt-20 bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-xl max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-4 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                        <div className="h-8 w-64 bg-slate-200 rounded-lg mx-auto mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                        <div className="w-20 h-1 bg-slate-200 mx-auto rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                    </div>

                    {[1, 2, 3, 4].map((item) => (
                        <div key={`req-${item}`} className="flex items-center gap-4 p-4 mb-4">
                            <div className="w-9 h-9 bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                            <div className="h-6 w-full bg-slate-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}