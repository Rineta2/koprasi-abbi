import React from 'react'

export default function SisaHasilUsahaSkeleton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-card-border shadow-lg">
                <div className="space-y-3">
                    <div className="relative h-10 w-48 overflow-hidden rounded-lg bg-gray-200">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                    </div>
                    <div className="relative h-6 w-64 overflow-hidden rounded bg-gray-200">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                    </div>
                </div>
            </div>

            {/* Content Cards Skeleton */}
            {[1, 2].map((item) => (
                <div key={item} className='w-full bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl mb-8 overflow-hidden'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Skeleton */}
                        <div className="relative h-[300px] lg:h-[400px] overflow-hidden bg-gray-200">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="p-8 md:p-12 flex flex-col justify-between h-full">
                            <div className="space-y-6">
                                <div className="relative h-8 w-3/4 overflow-hidden rounded-lg bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                                </div>
                                <div className="space-y-3">
                                    <div className="relative h-4 w-full overflow-hidden rounded bg-gray-200">
                                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                                    </div>
                                    <div className="relative h-4 w-5/6 overflow-hidden rounded bg-gray-200">
                                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-8 border-t border-border/30 mt-auto">
                                <div className="relative h-12 w-24 overflow-hidden rounded-xl bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                                </div>
                                <div className="relative h-12 w-24 overflow-hidden rounded-xl bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}