import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section */}
            <div className="bg-background/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/20 p-8 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2">
                        <div className="h-10 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-5 w-96 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="bg-background/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100/10 p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left side - Profile Image */}
                    <div className="flex flex-col items-center space-y-8 order-1 lg:order-2">
                        <div className="w-48 h-48 rounded-full bg-gray-200 relative overflow-hidden ring-4 ring-indigo-50">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Right side - Form Fields */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white/50 backdrop-blur-lg rounded-2xl border border-gray-200/50"
                                >
                                    <div className="h-5 w-24 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-8 w-full bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}