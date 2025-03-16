"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { collection, onSnapshot, Timestamp as FirebaseTimestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { ReferralNetwork, Supporter, Timestamp, User } from '@/hooks/dashboard/user/community/lib/schema'

import { useAuth } from '@/utils/context/AuthContext'

const Icons = {
    Check: () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
            />
        </svg>
    ),
    Users: () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
    ),
    Calendar: () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
            />
        </svg>
    ),
    ChevronDown: ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className || "h-5 w-5"}
        >
            <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
            />
        </svg>
    ),
}

const formatDate = (timestamp: Timestamp) => {
    const date = (timestamp as unknown as FirebaseTimestamp).toDate();
    return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};

const SupporterCard = ({ supporter, expanded, onToggle }: { supporter: Supporter, expanded: boolean, onToggle: (supporterId: string) => void }) => (
    <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icons.Users />
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-primary">{supporter.username}</h4>
                    <p className="text-sm text-text-dark/80">Code: {supporter.referralCode}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-dark/80 bg-white/5 px-4 py-2 rounded-full">
                <Icons.Calendar />
                <span>{formatDate(supporter.joinedAt as Timestamp)}</span>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-text-dark/80">Bergabung:</span>
                <span className="font-medium text-primary">{supporter.count} Orang</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-text-dark/80">Tipe:</span>
                <span className="font-medium text-primary">{supporter.type}</span>
            </div>
        </div>

        {supporter.usedBy && supporter.usedBy.length > 0 && (
            <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-text-dark/80">
                            Digunakan oleh ({supporter.usedBy.length})
                        </h5>
                        <button
                            onClick={() => onToggle(supporter.uid)}
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-all px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20"
                        >
                            {expanded ? "Sembunyikan" : "Lihat Semua"}
                            <Icons.ChevronDown className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    <div className="grid gap-3">
                        {supporter.usedBy
                            .slice(0, expanded ? undefined : 2)
                            .map((user: User, idx: number) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <span className="font-medium text-primary">{user.username}</span>
                                    <span className="text-xs text-text-dark/80 mt-2 sm:mt-0">
                                        {formatDate(user.joinedAt as Timestamp)}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        )}
    </div>
)

export default function CommunityLayout() {
    const [referralData, setReferralData] = useState<ReferralNetwork[]>([])
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
            }
        }, (error) => {
            console.error('Realtime listener error:', error)
        })

        // Cleanup subscription when component unmounts
        return () => unsubscribe()
    }, [user])

    return (
        <section className="min-h-full px-0 sm:px-2 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10"
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
                        className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 sm:p-8"
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
                                <div className="grid gap-3 text-sm bg-white/5 p-4 rounded-xl">
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Created:</span>
                                        <span className="text-primary">{formatDate(referral.createdAt as Timestamp)}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Type:</span>
                                        <span className="text-primary">{referral.type}</span>
                                    </p>
                                    <p className="flex items-center gap-2 text-text-dark/80">
                                        <span>Updated:</span>
                                        <span className="text-primary">{formatDate(referral.updatedAt as Timestamp)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Vertical Divider for Desktop */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent self-stretch" />

                            {/* Horizontal Divider for Mobile/Tablet */}
                            <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
