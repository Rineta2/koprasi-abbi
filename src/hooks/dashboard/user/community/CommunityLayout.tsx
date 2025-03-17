"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { collection, onSnapshot } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { ReferralNetwork } from '@/hooks/dashboard/user/community/lib/schema'

import { useAuth } from '@/utils/context/AuthContext'

import { Icons, formatDate } from '@/hooks/dashboard/user/community/ui/icons'

import { Timestamp as FirebaseTimestamp } from 'firebase/firestore'

import { SupporterCard } from "@/hooks/dashboard/user/community/ui/card"

import CommunitySkelaton from "@/hooks/dashboard/user/community/CommunitySkelaton"

export default function CommunityLayout() {
    const [referralData, setReferralData] = useState<ReferralNetwork[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [expandedSupporters, setExpandedSupporters] = useState<{ [key: string]: boolean }>({})
    const [expandedReferrals, setExpandedReferrals] = useState<{ [key: string]: boolean }>({})
    const { user } = useAuth()

    const toggleShowMore = (supporterId: string) => {
        setExpandedSupporters(prev => ({
            ...prev,
            [supporterId]: !prev[supporterId]
        }))
    }

    const toggleShowMoreSupporters = (referralId: string) => {
        setExpandedReferrals(prev => ({
            ...prev,
            [referralId]: !prev[referralId]
        }))
    }

    useEffect(() => {
        if (!user) return

        // Gunakan onSnapshot untuk realtime updates
        const referralCollection = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_REFEL_NETWORK as string)
        const unsubscribe = onSnapshot(referralCollection, (snapshot) => {
            try {
                const referralList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as ReferralNetwork))

                const filteredList = referralList.filter(referral =>
                    referral.ownerUid === user.uid ||
                    referral.supporters?.some(supporter =>
                        supporter.uid === user.uid
                    )
                )

                console.log('Realtime data update:', filteredList)
                setReferralData(filteredList)
            } catch (error) {
                console.error('Error processing realtime data:', error)
            } finally {
                setIsLoading(false)
            }
        }, (error) => {
            console.error('Realtime listener error:', error)
        })

        return () => unsubscribe()
    }, [user])

    if (isLoading) {
        return (
            <CommunitySkelaton />
        )
    }

    return (
        <section className="min-h-full px-0 sm:px-2 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 p-8 sm:p-10"
            >
                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                        Referral Network
                    </h1>
                    <p className="text-text-dark/80 text-lg">Kelola jaringan referral Anda</p>
                </div>
            </motion.div>

            <div className="grid gap-8">
                {referralData.map((referral, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        key={referral.id}
                        className="bg-card/90 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-6 sm:p-8"
                    >
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Owner Info */}
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Icons.Check />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary">{referral.ownerUsername}</h3>
                                        <p className="text-sm text-text-dark/80">Code: {referral.ownerReferralCode}</p>
                                    </div>
                                </div>
                                <div className="grid gap-3 text-sm bg-card/50 p-4 rounded-xl border border-border/70">
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Created:</span>
                                        <span className="text-primary">{formatDate(referral.createdAt as FirebaseTimestamp)}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Type:</span>
                                        <span className="text-primary">{referral.type}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Updated:</span>
                                        <span className="text-primary">{formatDate(referral.updatedAt as FirebaseTimestamp)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Vertical Divider for Desktop */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent self-stretch" />

                            {/* Horizontal Divider for Mobile/Tablet */}
                            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                            {/* Supporters Section */}
                            <div className="flex-[2]">
                                <h4 className="text-lg font-semibold mb-4">
                                    Supporters ({referral.supporters.length})
                                </h4>
                                <div className="grid gap-4">
                                    {referral.supporters
                                        .slice(0, expandedReferrals[referral.id] ? undefined : 3)
                                        .map((supporter) => (
                                            <SupporterCard
                                                key={supporter.uid}
                                                supporter={supporter}
                                                expanded={expandedSupporters[supporter.uid] || false}
                                                onToggle={toggleShowMore}
                                            />
                                        ))}
                                </div>

                                {referral.supporters.length > 3 && (
                                    <button
                                        onClick={() => toggleShowMoreSupporters(referral.id)}
                                        className="mt-4 text-sm text-primary hover:text-primary-dark transition-colors duration-200"
                                    >
                                        {expandedReferrals[referral.id]
                                            ? 'Show Less'
                                            : `Show More (${referral.supporters.length - 3} more)`}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
