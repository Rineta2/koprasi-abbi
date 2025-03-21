import React from 'react'

export default function CommunitySkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-2">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl shadow-lg border border-border/40 p-6 sm:p-8">
                <div className="space-y-2">
                    <div className="h-10 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-6 w-64 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Referral Networks */}
            <div className="grid gap-6 mt-8">
                {[1, 2].map((item) => (
                    <div key={item} className="bg-card/95 backdrop-blur-md rounded-2xl border border-border/40 shadow-md p-5 sm:p-7">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Owner Info */}
                            <div className="flex-1 space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-8 w-40 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-5 w-56 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-3 bg-gray-50 p-5 rounded-xl border border-border/50">
                                    {[1, 2, 3].map((info) => (
                                        <div key={info} className="flex items-center justify-between">
                                            <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dividers */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent self-stretch opacity-30" />
                            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30 my-4" />

                            {/* Supporters Section */}
                            <div className="flex-[2] space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="h-6 w-32 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((supporter) => (
                                        <div key={supporter} className="p-4 bg-gray-50 rounded-xl border border-border/40">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-5 w-36 bg-gray-200 rounded relative overflow-hidden">
                                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                    </div>
                                                    <div className="h-4 w-48 bg-gray-200 rounded relative overflow-hidden">
                                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}