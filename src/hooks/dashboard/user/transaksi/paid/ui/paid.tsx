import React from 'react'

export default function Paid({ handleBuy }: { handleBuy: () => void }) {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                {/* Empty Transaction SVG Icon */}
                <svg
                    className="w-48 h-48 mb-8 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5Z"
                        className="fill-primary/10 stroke-primary"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M16 10H8M16 14H8"
                        className="stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="space-y-4">
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        Belum ada transaksi berhasil
                    </h1>

                    <p className='text-sm sm:text-base text-gray-500 max-w-md mx-auto'>
                        Tidak ada transaksi yang berhasil saat ini.
                        Silakan lakukan transaksi untuk melihat daftar transaksi berhasil.
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
