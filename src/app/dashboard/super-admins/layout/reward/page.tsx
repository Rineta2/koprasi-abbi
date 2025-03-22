import React from 'react'

import { Metadata } from 'next'

import RewardLayout from '@/hooks/dashboard/super-admins/layout/reward/RewardLayout'

export const metadata: Metadata = {
    title: 'Reward | Koperasi ABBI',
    description: 'Reward',
}

export default function Reward() {
    return (
        <RewardLayout />
    )
}
