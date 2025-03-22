"use client"

import React, { useState, useEffect } from 'react'

import Marquee from 'react-fast-marquee';

import PartnerSkelaton from '@/components/ui/partner/PartnerSkelaton';

import { FetchPartner } from '@/components/ui/partner/lib/FetchPartner';

import { PartnerType } from '@/components/ui/partner/lib/schema';

import PartnerHeader from '@/components/ui/partner/ui/PartnerHeader';

import PartnerCard from '@/components/ui/partner/ui/PartnerCard';

export default function Partner() {
    const [partner, setPartner] = useState<PartnerType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchPartner((newPartner) => {
            setPartner(newPartner);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PartnerSkelaton />;
    }

    return (
        <section className="py-12 md:py-20 overflow-hidden">
            <div className="container relative px-4 md:px-6">
                <PartnerHeader />

                <div className="relative">
                    {/* Left gradient fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 
                        bg-gradient-to-r from-background to-transparent z-10" />

                    <Marquee
                        gradient={false}
                        speed={30}
                        pauseOnHover={true}
                        autoFill={true}
                        loop={0}
                        className='overflow-hidden py-4'
                    >
                        {partner.map((item) => (
                            <PartnerCard key={item.id} partner={item} />
                        ))}
                    </Marquee>

                    {/* Right gradient fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 
                        bg-gradient-to-l from-background to-transparent z-10" />
                </div>
            </div>
        </section>
    )
}
