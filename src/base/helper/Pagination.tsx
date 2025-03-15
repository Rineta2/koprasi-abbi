import React from 'react';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="py-6 px-4 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1.5 rounded-full bg-background-dark text-text font-medium">
                        Page {currentPage + 1}
                    </span>

                    <span className="text-text-dark">
                        of {Math.max(1, totalPages)}
                    </span>
                </div>

                <ReactPaginate
                    previousLabel={
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">Previous</span>
                        </div>
                    }
                    nextLabel={
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="hidden sm:inline">Next</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    }
                    breakLabel={
                        <span className="flex items-center justify-center w-10 h-10 text-text-dark">
                            •••
                        </span>
                    }
                    pageCount={Math.max(1, totalPages)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={onPageChange}
                    forcePage={currentPage}
                    containerClassName={'flex items-center gap-2 sm:gap-3'}
                    pageClassName={'flex'}
                    pageLinkClassName={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        text-sm font-medium text-text
                        hover:bg-background-dark hover:text-primary
                        transition-all duration-200 ease-in-out
                        hover:scale-105
                    `}
                    previousClassName={'flex'}
                    previousLinkClassName={`
                        flex items-center px-4 h-10 rounded-full
                        text-text font-medium
                        hover:bg-background-dark hover:text-primary
                        transition-all duration-200 ease-in-out
                        hover:scale-105
                    `}
                    nextClassName={'flex'}
                    nextLinkClassName={`
                        flex items-center px-4 h-10 rounded-full
                        text-text font-medium
                        hover:bg-background-dark hover:text-primary
                        transition-all duration-200 ease-in-out
                        hover:scale-105
                    `}
                    breakClassName={'flex'}
                    breakLinkClassName={'flex items-center justify-center'}
                    activeClassName={`
                        !bg-primary !text-white
                        shadow-lg shadow-primary/25
                        scale-105
                    `}
                    disabledClassName={`
                        opacity-40 cursor-not-allowed
                        hover:bg-transparent hover:text-text
                        hover:scale-100
                    `}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};