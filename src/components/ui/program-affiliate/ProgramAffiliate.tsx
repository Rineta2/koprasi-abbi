"use client"

import React, { useState, useEffect } from 'react'

import { motion } from "framer-motion"

import { FetchProgramAffiliate } from "@/components/ui/program-affiliate/lib/FetchProgramAffiliate"

import ProgramAffiliateSkelaton from "@/components/ui/program-affiliate/ProgramAffiliateSkelaton"

import { ProgramAffiliateType } from "@/components/ui/program-affiliate/lib/schema"

import { BackgroundElements } from '@/components/ui/program-affiliate/ui/BackgroundEffect'

import { ProgramHeader } from '@/components/ui/program-affiliate/ui/ProgramHeader'

import { BenefitsGrid } from '@/components/ui/program-affiliate/ui/BenefitGrid'

export default function ProgramAffiliate() {
    const [programAffiliate, setProgramAffiliate] = useState<ProgramAffiliateType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchProgramAffiliate((newProgramAffiliate) => {
            setProgramAffiliate(newProgramAffiliate);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ProgramAffiliateSkelaton />;
    }

    return (
        <section className='min-h-full py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0b0b0d] to-[#131316]'>
            <BackgroundElements />

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                {programAffiliate.map((item) => (
                    <motion.div
                        key={item.id}
                        className="mb-16 md:mb-24 lg:mb-32"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <ProgramHeader title={item.title} description={item.description} />
                        <BenefitsGrid benefits={item.benefits} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
