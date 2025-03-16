"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { PendaftaranAnggotaKoperasiType } from '@/components/ui/pendaftaran-anggota-koperasi/lib/schema'

import { FetchPendaftaranAnggotaKoperasi } from '@/components/ui/pendaftaran-anggota-koperasi/lib/FetchPendaftaranAnggotaKoperasi'

import PendaftaranAnggotaKoperasiSkeleton from '@/components/ui/pendaftaran-anggota-koperasi/PendaftaranAnggotaKoperasikelaton'

import Link from 'next/link'

import { motion } from 'framer-motion'

export default function Assets() {

    const [pendaftaranAnggotaKoperasi, setPendaftaranAnggotaKoperasi] = useState<PendaftaranAnggotaKoperasiType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchPendaftaranAnggotaKoperasi((newPendaftaranAnggotaKoperasi) => {
            setPendaftaranAnggotaKoperasi(newPendaftaranAnggotaKoperasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PendaftaranAnggotaKoperasiSkeleton />;
    }

    return (
        <section className="relative min-h-screen overflow-hidden py-12 md:py-24 bg-gradient-to-b from-background via-background/90 to-background/50" id="register">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="flex flex-col space-y-8">
                    {pendaftaranAnggotaKoperasi.map((item) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            key={item.id}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 relative overflow-hidden"
                        >
                            {/* Card Decorative Elements */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Gradient Blobs */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
                                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />

                                {/* Decorative Lines */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
                                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

                                {/* Dot Pattern */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:16px_16px]" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                <div className="flex-1 space-y-8">
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                                    >
                                        {item.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                                    >
                                        {item.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <Link
                                            href="/auth/register"
                                            className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-200 hover:scale-105 relative overflow-hidden shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                                        >
                                            <span className="relative z-10">Daftar Sekarang</span>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1 relative z-10"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className="flex gap-8 items-center overflow-y-auto scrollbar-hide">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <Image
                                            src={item.svgUrl}
                                            alt={item.title}
                                            width={240}
                                            height={240}
                                            className="rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300 relative z-10"
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            width={240}
                                            height={240}
                                            className="rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300 relative z-10"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
