import React from 'react'

export default function Unpaid({ handleBack }: { handleBack: () => void }) {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                {/* Cancelled Transaction SVG Icon */}
                <svg
                    className="w-48 h-48 mb-8 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <g strokeWidth="1.5" className="stroke-primary">
                        {/* Receipt Background */}
                        <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="2"
                            className="fill-primary/10"
                        />
                        {/* Receipt Lines */}
                        <path
                            d="M8 9H16M8 12H16M8 15H13"
                            strokeLinecap="round"
                        />
                        {/* Cancel Circle and X */}
                        <circle
                            cx="16"
                            cy="16"
                            r="5"
                            className="fill-red-100 stroke-red-500"
                        />
                        <path
                            d="M14 14L18 18M18 14L14 18"
                            className="stroke-red-500"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>

                <div className="space-y-4">
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        Belum ada transaksi dibatalkan
                    </h1>

                    <p className='text-sm sm:text-base text-gray-500 max-w-md mx-auto'>
                        Tidak ada transaksi yang dibatalkan saat ini.
                        Silakan lakukan transaksi untuk melihat daftar transaksi dibatalkan.
                    </p>

                    {/* Optional: Add a CTA button */}
                    <button onClick={handleBack} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300 font-medium">
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                stroke="currentColor"
                            />
                        </svg>
                        Kembali ke halaman transaksi
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
