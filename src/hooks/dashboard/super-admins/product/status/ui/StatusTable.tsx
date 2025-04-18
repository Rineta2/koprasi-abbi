import React from 'react';

import { format } from 'date-fns';

import { StatusContent } from '@/hooks/dashboard/super-admins/product/status/lib/schema';

import { Pagination } from '@/base/helper/Pagination';

interface StatusTableProps {
    status: StatusContent[];
    onEdit: (status: StatusContent) => void;
    onDelete: (id: string) => void;
}

export const StatusTable: React.FC<StatusTableProps> = ({
    status,
    onEdit,
    onDelete
}) => {
    // Add pagination state
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 10; // You can adjust this number

    // Calculate pagination values
    const offset = currentPage * itemsPerPage;
    const currentStatus = status.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(status.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <div className="space-y-4">
            <div className="bg-card rounded-xl shadow-sm border border-border/30">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full divide-y divide-border/20">
                        <thead>
                            <tr>
                                <th className="bg-background-dark/50 px-4 py-3 text-xs font-semibold text-text-dark uppercase tracking-wider border-b border-border/20">
                                    Ditambahkan
                                </th>
                                <th className="bg-background-dark/50 px-4 py-3 text-xs font-semibold text-text-dark uppercase tracking-wider border-b border-border/20">
                                    Title
                                </th>
                                <th className="bg-background-dark/50 px-4 py-3 text-xs font-semibold text-text-dark uppercase tracking-wider text-center border-b border-border/20">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/10 bg-card">
                            {currentStatus.map((status) => (
                                <tr key={status.id} className="hover:bg-card-hover transition-colors duration-200">
                                    <td className='px-4 py-3 whitespace-nowrap text-sm font-medium text-text text-center'>
                                        {status.createdAt && format(status.createdAt.toDate(), 'PPpp')}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text text-center capitalize">
                                        {status.title}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm flex justify-center">
                                        <button
                                            onClick={() => onEdit(status)}
                                            className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg mr-2 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(status.id!)}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {status.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-4 py-6 text-center text-text-dark">
                                        No status found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Pagination */}
            {status.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};