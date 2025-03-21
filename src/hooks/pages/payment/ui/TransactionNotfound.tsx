import React from 'react'

import Image from 'next/image'

import errorImg from '@/base/assets/payment/error.jpg'

import Link from 'next/link'

export default function TransactionNotfound() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundColor: '#000B18',
                backgroundImage: `
                    linear-gradient(90deg, transparent 0%, transparent 49%, rgba(14, 165, 233, 0.1) 49%, rgba(14, 165, 233, 0.1) 51%, transparent 51%, transparent 100%),
                    linear-gradient(180deg, transparent 0%, transparent 49%, rgba(14, 165, 233, 0.1) 49%, rgba(14, 165, 233, 0.1) 51%, transparent 51%, transparent 100%),
                    linear-gradient(45deg, rgba(14, 165, 233, 0.01) 0%, transparent 100%)
                `,
                backgroundSize: '60px 60px, 60px 60px, 100% 100%'
            }}
        >
            {/* Animated cyber lines */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, transparent 0%, #0EA5E9 50%, transparent 100%)
                    `,
                    backgroundSize: '200% 100%',
                    animation: 'shine 8s linear infinite'
                }}
            />
            <style jsx>{`
                @keyframes shine {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
            `}</style>

            {/* Diagonal lines overlay */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(45deg, #0EA5E9 0, #0EA5E9 1px, transparent 1px, transparent 30px)
                    `,
                    backgroundSize: '30px 30px',
                    animation: 'slide 20s linear infinite'
                }}
            />
            <style jsx>{`
                @keyframes slide {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 60px 60px;
                    }
                }
            `}</style>

            {/* Main Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-slate-900/90 rounded-3xl shadow-2xl backdrop-blur-xl border border-sky-500/20">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="flex-shrink-0 w-full max-w-[280px] lg:w-auto">
                            <Image
                                src={errorImg}
                                alt="Error Icon"
                                width={280}
                                height={280}
                                className="rounded-3xl shadow-lg hover:shadow-sky-500/20 transition-all duration-300 object-cover"
                            />
                        </div>
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600">
                                Error Occurred
                            </h1>
                            <p className="text-slate-300 text-lg sm:text-xl font-medium">Transaksi tidak ditemukan</p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                <Link
                                    href="/"
                                    className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-2xl hover:shadow-xl hover:shadow-sky-500/20 hover:-translate-y-1 transition-all duration-300 ease-out inline-flex items-center justify-center gap-3"
                                >
                                    <span className="font-semibold">Back to Home</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/support"
                                    className="w-full sm:w-auto group px-8 py-4 bg-slate-800 border-2 border-sky-500/20 text-slate-200 rounded-2xl hover:border-sky-500/50 hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out inline-flex items-center justify-center gap-3"
                                >
                                    <span className="font-semibold">Contact Support</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
