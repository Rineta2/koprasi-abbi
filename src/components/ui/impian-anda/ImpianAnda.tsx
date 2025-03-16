"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { FetchImpianAnda } from "@/components/ui/impian-anda/lib/FetchImpianAnda"

import ImpianAndaSkelaton from "@/components/ui/impian-anda/ImpianAndaSkelaton"

import { ImpianAndaType } from "@/components/ui/impian-anda/lib/schema"

import Image from "next/image"

export default function ImpianAnda() {
    const [impianAnda, setImpianAnda] = useState<ImpianAndaType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchImpianAnda((newImpianAnda) => {
            setImpianAnda(newImpianAnda);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ImpianAndaSkelaton />;
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24">
            {/* Decorative lines */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-[2px] w-[200%] bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -rotate-45"
                            style={{
                                top: `${i * 15}%`,
                                left: `-${i * 10}%`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container relative z-10 px-4 md:px-8 lg:px-12 space-y-16">
                {
                    impianAnda.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            key={item.id}
                            className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 rounded-2xl p-6 shadow-lg'
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                                className="flex flex-col justify-center space-y-4 p-4"
                            >
                                <div className="relative">
                                    <h1 className="text-3xl md:text-4xl font-bold">
                                        {item.title}
                                    </h1>
                                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                </div>

                                <p className="text-lg">
                                    {item.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                                className='flex items-center justify-center'
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 object-cover w-full h-[300px] md:h-[400px]"
                                />
                            </motion.div>
                        </motion.div>
                    ))
                }
            </div>
        </section>
    )
}
