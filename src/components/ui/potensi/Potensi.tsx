import React from 'react'

import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function Potensi() {
    return (
        <section className='min-h-full relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50'>
            <div className="container px-4 py-16 md:py-24 lg:py-32 relative z-10 mx-auto">
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
                    <div className="mb-12 space-y-6">
                        <svg className="w-16 h-16 text-blue-600 mx-auto transform transition-transform hover:scale-110 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient'>
                            ADA POTENSI HADIAH BAGI ANDA JIKA ANDA MEREKRUT ANGGOTA BARU
                        </h1>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <MdKeyboardDoubleArrowDown className='text-blue-600 text-4xl animate-bounce' />
                    </div>
                </div>
            </div>
        </section>
    )
}
