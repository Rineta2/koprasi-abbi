"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { FetchLegalisasi } from '@/components/ui/legalisasi/lib/FetchLegalisasi';

import { LegalisasiType } from '@/components/ui/legalisasi/lib/schema';

import LegalisasiSkelaton from '@/components/ui/legalisasi/LegalisasiSkelaton';

import Image from 'next/image';

export default function Legalisasi() {
    const [legalisasi, setLegalisasi] = useState<LegalisasiType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchLegalisasi((newLegalisasi) => {
            setLegalisasi(newLegalisasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <LegalisasiSkelaton />;
    }

    return (
        <section className='min-h-screen bg-background relative overflow-hidden' id='legalitas'>
            {/* Modern tech background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Gradient mesh background - theme synchronized */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--background-dark),var(--background))] opacity-70"></div>

                {/* Animated grid with fade - theme synchronized */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-dark)05_1px,transparent_1px),linear-gradient(to_bottom,var(--text-dark)05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--primary)20,transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,var(--primary-dark)20,transparent)]"></div>
                </div>

                {/* Modern geometric shapes - theme synchronized */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-primary-dark/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

                {/* Floating elements - theme synchronized */}
                <div className="absolute top-1/3 left-1/2 w-1 h-20 bg-gradient-to-b from-primary/30 to-transparent rotate-45 animate-float-slow"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-20 bg-gradient-to-b from-primary-dark/30 to-transparent -rotate-45 animate-float"></div>

                {/* Glowing dots - theme synchronized */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_4px_var(--primary)] animate-glow"></div>
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary-dark rounded-full shadow-[0_0_8px_4px_var(--primary-dark)] animate-glow-delayed"></div>
            </div>

            <div className="container mx-auto relative z-10 py-16">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col items-center justify-center space-y-6 mb-16'
                >
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary animate-gradient-x'>
                        {legalisasi[0].companyName}
                    </h1>
                    <h3 className='text-xl md:text-2xl font-medium text-text-dark/80 text-center'>
                        {legalisasi[0].legalType}
                    </h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='backdrop-blur-xl bg-card/95 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-border/40 hover:border-primary/30 transition-all duration-500 max-w-[95%] sm:max-w-[90%] mx-auto'
                >
                    <div className='flex flex-col space-y-16'>
                        {/* Logo Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className='flex justify-center items-center'
                        >
                            <div className='relative group'>
                                <Image
                                    src={legalisasi[0].imageUrl}
                                    alt={legalisasi[0].companyName}
                                    width={500}
                                    height={500}
                                    className='relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-[2rem]'
                                />
                            </div>
                        </motion.div>

                        {/* Registration Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                                <h3 className='text-2xl md:text-3xl font-bold text-text'>
                                    {legalisasi[0].registrationLabel}
                                </h3>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {Object.entries(legalisasi[0].registrationNumbers).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-border/30 hover:border-primary/40 hover:bg-card-hover/50 group transform hover:-translate-y-1'
                                    >
                                        <h4 className='text-md font-medium text-text-dark/70 mb-3 group-hover:text-primary transition-colors uppercase'>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p className='font-semibold text-text text-lg'>{value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Management Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                <h3 className='text-2xl md:text-3xl font-bold text-text'>
                                    Management
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                {Object.entries(legalisasi[0].management).map(([role, name], index) => (
                                    <motion.div
                                        key={role}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-border/30 hover:border-primary/40 hover:bg-card-hover/50 group transform hover:-translate-y-1'
                                    >
                                        <h4 className='text-md font-medium text-text-dark/70 mb-3 group-hover:text-primary transition-colors uppercase'>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </h4>
                                        <p className='font-semibold text-text text-lg'>{name}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Alamat Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-8">
                                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <h3 className='text-2xl md:text-3xl font-bold text-text'>
                                    Alamat
                                </h3>
                            </div>

                            <div className='grid grid-cols-1 gap-6'>
                                <div className='bg-card/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-border/30 hover:border-primary/40 hover:bg-card-hover/50 group transform'>
                                    <h4 className='text-md font-medium text-text-dark/70 mb-3 group-hover:text-primary transition-colors uppercase'>
                                        Alamat
                                    </h4>

                                    <p className='font-semibold text-text text-lg leading-relaxed'>
                                        {legalisasi[0].address.street} {legalisasi[0].address.village} {legalisasi[0].address.district} {legalisasi[0].address.city} {legalisasi[0].address.province} {legalisasi[0].address.postalCode}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
