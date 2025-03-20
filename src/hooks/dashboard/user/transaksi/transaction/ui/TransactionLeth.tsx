import React from 'react'

export default function TransactionLeth({ handleBuy }: { handleBuy: () => void }) {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                {/* Modern SVG Illustration */}
                <svg
                    className="w-48 h-48 mb-8 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19Z"
                        className="fill-primary/20 stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15 19V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V19C9 20.1046 9.89543 21 11 21H13C14.1046 21 15 20.1046 15 19Z"
                        className="fill-primary/10 stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21 19V9C21 7.89543 20.1046 7 19 7H17C15.8954 7 15 7.89543 15 9V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19Z"
                        className="fill-primary/5 stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <div className="space-y-4">
                    <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                        Belum ada transaksi
                    </h1>
                    <p className='text-sm sm:text-base text-gray-500 max-w-md mx-auto'>
                        Tidak ada transaksi yang sedang menunggu pembayaran saat ini.
                        Semua transaksi Anda telah selesai.
                    </p>

                    {/* Optional: Add a CTA button */}
                    <button onClick={handleBuy} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300 font-medium">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Mulai Berbelanja
                    </button>
                </div>

                {/* Optional: Add decorative elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-[40%] top-[20%] h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute right-[30%] bottom-[10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
                </div>
            </div>
        </section>
    )
}
