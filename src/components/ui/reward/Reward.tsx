"use client"

import React, { useState, useEffect } from 'react'

import { FetchReward } from "@/components/ui/reward/lib/FetchReward"

import RewardSkeleton from "@/components/ui/reward/RedawardSkelaton"

import { RewardType } from "@/components/ui/reward/lib/schema"

import BackgroundElements from '@/components/ui/reward/ui/BackgroundElements'

import RewardHeader from '@/components/ui/reward/ui/RewardHeader'

import BenefitColumns from '@/components/ui/reward/ui/BenefitColumns'

import RequirementsSection from '@/components/ui/reward/ui/RequirementsSection'

export default function ProgramAffiliate() {
    const [reward, setReward] = useState<RewardType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchReward((newReward) => {
            setReward(newReward);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <RewardSkeleton />;
    }

    return (
        <section className='min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50'>
            <BackgroundElements />
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
                <RewardHeader />
                <BenefitColumns reward={reward} />
                <RequirementsSection reward={reward} />
            </div>
        </section>
    )
}
