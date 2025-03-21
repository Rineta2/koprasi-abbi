import React from 'react'
import { motion } from 'framer-motion'

export default function RekapSkeleton() {
    return (
        <section className='min-h-full px-0 space-y-6'>
            {/* Header Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <div className="h-10 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-72 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-40 h-12 bg-gray-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Filter Section Skeleton */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-11 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Chart Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg w-full"
                style={{ height: '400px', position: 'relative' }}
            >
                <div className="h-8 w-40 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </motion.div>

            {/* Transactions Table Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg"
            >
                <div className="h-8 w-56 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {[...Array(6)].map((_, index) => (
                                    <th key={index} className="px-6 py-3 text-left">
                                        <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    {[...Array(6)].map((_, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4">
                                            <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr className="bg-gray-50">
                                <td colSpan={5} className="px-6 py-4">
                                    <div className="h-4 w-48 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-32 bg-gray-200 rounded relative overflow-hidden float-right">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Summary Per User Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 shadow-lg"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <div className="h-8 w-56 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="h-8 w-36 bg-gray-200 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User sorting options skeleton */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="h-10 w-48 sm:w-64 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-10 w-full sm:w-64 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* User summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="h-5 w-32 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-40 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-3 w-36 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[...Array(2)].map((_, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="h-4 w-20 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-16 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-4">
                                    <div className="h-4 w-28 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="space-y-1.5 max-h-20">
                                        {[...Array(3)].map((_, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="h-3 w-24 bg-gray-200 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="h-3 w-8 bg-gray-200 rounded-full relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}