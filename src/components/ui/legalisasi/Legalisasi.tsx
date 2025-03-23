"use client"

import React, { useState, useEffect } from 'react'

import { FetchLegalisasi } from '@/components/ui/legalisasi/lib/FetchLegalisasi';

import { LegalisasiType } from '@/components/ui/legalisasi/lib/schema';

import LegalisasiSkelaton from '@/components/ui/legalisasi/LegalisasiSkelaton';

import BackgroundEffects from '@/components/ui/legalisasi/ui/BackgroundEffects';

import HeaderSection from '@/components/ui/legalisasi/ui/HeaderSection';

import RegistrationSection from '@/components/ui/legalisasi/ui/RegistrationSection';

import ManagementSection from '@/components/ui/legalisasi/ui/ManagementSection';

import AddressSection from '@/components/ui/legalisasi/ui/AddressSection';

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
            <BackgroundEffects />

            <div className="container mx-auto relative z-10 py-16">
                <div className='backdrop-blur-xl bg-white/95 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-200 hover:border-primary/30 transition-all duration-500 max-w-[95%] sm:max-w-[90%] mx-auto'>
                    <div className='flex flex-col space-y-16'>
                        <HeaderSection data={legalisasi[0]} />
                        <RegistrationSection data={legalisasi[0]} />
                        <ManagementSection data={legalisasi[0]} />
                        <AddressSection data={legalisasi[0]} />
                    </div>
                </div>
            </div>
        </section>
    )
}
