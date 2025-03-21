import React from 'react'

export default function Unpaid({ handleBack }: { handleBack: () => void }) {
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
                        d="M4 9C4 8.44772 4.44772 8 5 8H19C19.5523 8 20 8.44772 20 9V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18V9Z"
                        className="fill-primary/10 stroke-primary"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M8 8V6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V8"
                        className="stroke-primary"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M12 12V17M12 17L15 14M12 17L9 14"
                        className="stroke-primary"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <div className="space-y-4">
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        Belum ada transaksi belum dibayar
                    </h1>

                    <p className='text-sm sm:text-base text-gray-500 max-w-md mx-auto'>
                        Tidak ada transaksi yang belum dibayar saat ini.
                        Silakan lakukan transaksi untuk melihat daftar transaksi belum dibayar.
                    </p>

                    {/* Optional: Add a CTA button */}
                    <button onClick={handleBack} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300 font-medium">
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
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
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
