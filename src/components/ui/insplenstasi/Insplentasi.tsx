"use client"

import React, { useState, useEffect } from 'react'

import { FetchInsplentasi } from "@/components/ui/insplenstasi/lib/FetchInsplentasi"

import InsplentasiSkelaton from "@/components/ui/insplenstasi/InsplentasiSkelaton"

import { InsplenstasiType } from "@/components/ui/insplenstasi/lib/schema"

import Image from "next/image"

import imgInsplentasi from "@/base/assets/insplentasi/bg.jpg"

import { useScrollOffset } from "@/base/helper/parllax"

import elang from "@/base/assets/trend-bisnis/garuda.png"

import coint from "@/base/assets/trend-bisnis/coin.png"

import { GiTronArrow } from "react-icons/gi";

import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

export default function Insplentasi() {
    const [insplenstasi, setInsplenstasi] = useState<InsplenstasiType[]>([]);
    const [loading, setLoading] = useState(true);
    const { offsetY, promotionsRef } = useScrollOffset();

    useEffect(() => {
        const unsubscribe = FetchInsplentasi((newInsplenstasi) => {
            setInsplenstasi(newInsplenstasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <InsplentasiSkelaton />;
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-24" ref={promotionsRef}>
            <div className='absolute top-0 left-0 w-full h-full' style={{ transform: `translateY(${offsetY * 0.5}px)` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 mix-blend-multiply" />
                <Image src={imgInsplentasi} alt='insplentasi' className='w-full h-full object-cover brightness-75 transition-all duration-500' />
            </div>

            <div className="container relative z-10 px-4 md:px-8 lg:px-12">
                {insplenstasi.map((item) => (
                    <div key={item.id} className='flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto backdrop-blur-md bg-white/20 p-6 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl hover:bg-white/25 transition-all duration-300'>
                        <div className='flex flex-col md:flex-row items-center justify-center gap-6 bg-white/95 p-6 md:p-8 rounded-2xl relative hover:shadow-xl transition-all duration-300'>
                            <div className='flex flex-wrap items-center justify-center gap-6 z-10'>
                                <Image src={elang} alt='elang' className='w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-105' />
                                <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 drop-shadow-sm text-center'>
                                    {item.title}
                                </h2>
                                <Image src={coint} alt='coint' className='w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-105' />
                            </div>

                            <div className='absolute -bottom-8 md:-bottom-12 left-4 rotate-12 -z-10 opacity-75'>
                                <GiTronArrow className='text-5xl md:text-7xl text-white/90' />
                            </div>

                            <div className='absolute -bottom-8 md:-bottom-12 right-4 rotate-90 -z-10 opacity-75'>
                                <GiTronArrow className='text-5xl md:text-7xl text-white/90' />
                            </div>
                        </div>

                        <div className='relative w-full overflow-hidden rounded-2xl bg-white/95 shadow-xl'>
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <div className='flex items-center justify-center animate-bounce'>
                            <MdOutlineKeyboardDoubleArrowDown className='text-3xl md:text-4xl text-white' />
                        </div>

                        <div className='relative w-full max-w-4xl mx-auto hover:scale-[1.02] transition-transform duration-300'>
                            <Image
                                src={item.svgUrl}
                                alt={item.title}
                                width={500}
                                height={500}
                                className='w-full h-auto drop-shadow-xl'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
