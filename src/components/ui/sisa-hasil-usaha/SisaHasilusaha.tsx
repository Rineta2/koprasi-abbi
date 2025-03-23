"use client"

import { useState, useEffect } from 'react'

import { FetchSisaHasilUsaha } from '@/components/ui/sisa-hasil-usaha/lib/FetchSisaHasilUsaha'

import { SisaHasilUsahaType } from '@/components/ui/sisa-hasil-usaha/lib/SisaHasilUsaha'

import { BackgroundSection } from '@/components/ui/sisa-hasil-usaha/ui/Background'

import { WaveDecoration } from '@/components/ui/sisa-hasil-usaha/ui/WaveDecoration'

import { SisaHasilUsahaCard } from '@/components/ui/sisa-hasil-usaha/ui/Card'

import SisaHasilUsahaSkelaton from '@/components/ui/sisa-hasil-usaha/SisaHasilUsahaSkelaton'

export default function SisaHasilusaha() {
    const [sisaHasilUsaha, setSisaHasilUsaha] = useState<SisaHasilUsahaType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchSisaHasilUsaha((newSisaHasilUsaha) => {
            setSisaHasilUsaha(newSisaHasilUsaha);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <SisaHasilUsahaSkelaton />;
    }

    return (
        <section className='min-h-screen relative py-16 md:py-24 lg:py-32 overflow-hidden'>
            <BackgroundSection />
            <WaveDecoration position="top" />

            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                {sisaHasilUsaha.map((item, index) => (
                    <SisaHasilUsahaCard
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))}
            </div>

            <WaveDecoration position="bottom" />
        </section>
    )
}
