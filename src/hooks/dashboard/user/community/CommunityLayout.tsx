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
        <section className="min-h-full px-0 sm:px-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl shadow-lg border border-border/40 p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
            >
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent tracking-tight">
                        Referral Network
                    </h1>
                    <p className="text-text-dark/70 text-lg font-medium">Kelola jaringan referral Anda</p>
                </div>
            </motion.div>

            <div className="grid gap-6 mt-8">
                {referralData.map((referral, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        key={referral.id}
                        className="bg-card/95 backdrop-blur-md rounded-2xl border border-border/40 shadow-md p-5 sm:p-7 overflow-hidden hover:shadow-lg hover:border-border/60 transition-all duration-300"
                    >
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Owner Info */}
                            <div className="flex-1 space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                                        <Icons.Check />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-2xl font-bold text-primary">{referral.ownerUsername}</h3>
                                            <span className={`px-4 py-1 text-xs font-semibold rounded-full ${referral.ownerAccountType === 'premium'
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {referral.ownerAccountType || 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-dark/80 mt-2 flex items-center gap-2">
                                            <span className="font-medium">Referral Code:</span>
                                            <code className="font-mono bg-card-hover/30 px-3 py-1 rounded-lg">{referral.ownerReferralCode}</code>
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 text-sm bg-card-hover/20 p-5 rounded-xl border border-border/50 hover:bg-card-hover/30 transition-all duration-300">
                                    <p className="flex items-center justify-between gap-2 text-text-dark/80">
                                        <span className="font-medium">Bergabung:</span>
                                        <span className="text-primary">{formatDate(referral.createdAt as FirebaseTimestamp)}</span>
                                    </p>

                                    <p className="flex items-center justify-between gap-2 text-text-dark/80">
                                        <span className="font-medium">Diperbarui:</span>
                                        <span className="text-primary">{formatDate(referral.updatedAt as FirebaseTimestamp)}</span>
                                    </p>

                                    <p className="flex items-center justify-between gap-2 text-text-dark/80">
                                        <span className="font-medium">Tipe:</span>
                                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{referral.type}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Dividers */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent self-stretch opacity-30" />
                            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30 my-4" />

                            {/* Supporters Section */}
                            <div className="flex-[2] space-y-5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold flex items-center gap-3">
                                        Supporters
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {referral.supporters.length}
                                        </span>
                                    </h4>
                                </div>

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
                                        className="mt-4 w-full text-sm bg-card-hover/30 hover:bg-card-hover/50 text-primary font-medium transition-all duration-200 py-3 rounded-xl border border-border/40 hover:border-border/70 flex items-center justify-center gap-2"
                                    >
                                        {expandedReferrals[referral.id]
                                            ? 'Show Less'
                                            : `Show More (${referral.supporters.length - 3} more)`}
                                        <Icons.ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${expandedReferrals[referral.id] ? "rotate-180" : ""}`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {referralData.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card/90 rounded-2xl p-8 text-center mt-8 border border-border/40"
                >
                    <p className="text-text-dark/70 text-lg font-medium">No referral networks found.</p>
                </motion.div>
            )}
        </section>
    )
}
