import React from 'react'

export default function Unpaid({ handleBuy }: { handleBuy: () => void }) {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                {/* Pending Transaction SVG Icon */}
                <svg
                    className="w-48 h-48 mb-8 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="fill-primary/5 stroke-primary"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M12 6V12L16 14"
                        className="stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 12H8M16 12H17M12 7V8M12 16V17"
                        className="stroke-primary/60"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="space-y-4">
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        Belum ada transaksi pending
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
