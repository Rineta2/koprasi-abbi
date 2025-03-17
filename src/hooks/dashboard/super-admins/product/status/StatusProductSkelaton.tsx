import React from 'react'

export default function StatusProductSkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-4">
            {/* Header Section Skeleton */}
            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                {[...Array(3)].map((_, index) => (
                                    <th key={index} className="p-4">
                                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-t border-border">
                                    <td className="p-4">
                                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-4">
                                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            {[...Array(2)].map((_, btnIndex) => (
                                                <div key={btnIndex} className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}