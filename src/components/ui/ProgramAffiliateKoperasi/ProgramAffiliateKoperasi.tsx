"use client"

import { useState, useEffect } from 'react';

import React from 'react'

import { ProgramAffiliateKoperasiType } from "@/components/ui/ProgramAffiliateKoperasi/lib/schema"

import { FetchProgramAffiliateKoperasi } from "@/components/ui/ProgramAffiliateKoperasi/lib/FetchProgramAffiliateKoperasi"

import ProgramAffiliateKoperasiSkelaton from "@/components/ui/ProgramAffiliateKoperasi/ProgramAffiliateKoperasiSkelaton"

import Header from '@/components/ui/ProgramAffiliateKoperasi/ui/ProgramHeader';

import BenefitCard from '@/components/ui/ProgramAffiliateKoperasi/ui/BenefitCard';

import BackgroundDecorations from '@/components/ui/ProgramAffiliateKoperasi/ui/BackgroundDecorations';

export default function ProgramAffiliateKoperasi() {
    const [programAffiliateKoperasi, setProgramAffiliateKoperasi] = useState<ProgramAffiliateKoperasiType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchProgramAffiliateKoperasi((newProgramAffiliateKoperasi) => {
            setProgramAffiliateKoperasi(newProgramAffiliateKoperasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ProgramAffiliateKoperasiSkelaton />;
    }
    return (
        <section className='min-h-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
            <BackgroundDecorations />

            <div className='container px-4 mx-auto max-w-7xl relative'>
                <Header title={programAffiliateKoperasi[0].title} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programAffiliateKoperasi.map((item) => (
                        item.benefits.map((benefit, index) => (
                            <BenefitCard
                                key={`${item.id}-${index}`}
                                benefit={benefit}
                                index={index}
                            />
                        ))
                    ))}
                </div>
            </div>
        </section>
    )
}
