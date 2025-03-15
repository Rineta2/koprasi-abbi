import React from 'react'
import { motion } from 'framer-motion'

export default function PartnerSkelaton() {
    return (
        <motion.section
            className='min-h-full px-0 sm:px-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section Skeleton - Matches PartnerHeader */}
            <div className="bg-gradient-to-r from-card to-card/80 backdrop-blur-sm rounded-3xl border p-8 mb-8 border-gray-100/10 dark:border-gray-800/20 shadow-lg shadow-primary/5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg animate-pulse"></div>
                        <div className="h-4 w-72 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded animate-pulse"></div>
                    </div>
                    {/* Create Button Skeleton */}
                    <div className="w-full sm:w-auto">
                        <div className="h-11 w-full sm:w-40 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Grid Content Skeleton - Matches PartnerGrid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {/* Generate 8 items to match itemsPerPage in layout */}
                {[...Array(8)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="bg-card rounded-2xl border border-border overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                        {/* Image placeholder - matches content image */}
                        <div className="relative aspect-video w-full bg-gradient-to-r from-gray-200/80 to-gray-300/80 animate-pulse"></div>

                        {/* Action buttons - matches Edit and Delete buttons */}
                        <div className="p-4 sm:p-5">
                            <div className="flex items-center justify-end gap-2">
                                <div className="h-9 w-20 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg animate-pulse"></div>
                                <div className="h-9 w-20 bg-gradient-to-r from-gray-200/80 to-gray-300/80 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}