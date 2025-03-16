"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { collection, getDocs, Timestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { ReferralNetwork } from '@/hooks/dashboard/user/community/lib/schema'

import { useAuth } from '@/utils/context/AuthContext'

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd" />
    </svg>
)

const formatDate = (timestamp: Timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};

export default function CommunityLayout() {
    const [referralData, setReferralData] = useState<ReferralNetwork[]>([])
    const { user } = useAuth()

    useEffect(() => {
        const fetchReferralNetwork = async () => {
            if (!user) return

            try {
                const referralCollection = collection(db, 'referralNetwork')
                const referralSnapshot = await getDocs(referralCollection)
                const referralList = referralSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as ReferralNetwork))
                    .filter(referral =>
                        referral.supporters?.some(supporter =>
                            supporter.uid === user.uid
                        )
                    )

                console.log('Fetched data:', referralList)
                setReferralData(referralList)
            } catch (error) {
                console.error('Error fetching referral network:', error)
            }
        }

        fetchReferralNetwork()
    }, [user])

    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card/50 backdrop-blur-xl rounded-3xl shadow-lg border border-border p-6 sm:p-8 mb-8"
            >
                <div className="space-y-2">
                    <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent'>
                        Referral Network
                    </h1>
                    <p className='text-text-dark'>Kelola jaringan referral Anda</p>
                </div>
            </motion.div>

            <div className="grid gap-6">
                {referralData.map((referral, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        key={referral.id}
                        className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-md p-6"
                    >
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Owner Info */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary">{referral.ownerUsername}</h3>
                                        <p className="text-sm text-text-dark">Code: {referral.ownerReferralCode}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2 text-sm text-text-dark">
                                    <p>Created: {formatDate(referral.createdAt as Timestamp)}</p>
                                    <p>Type: {referral.type}</p>
                                    <p>Updated: {formatDate(referral.updatedAt as Timestamp)}</p>
                                </div>
                            </div>

                            {/* Supporters Section */}
                            <div className="flex-[2]">
                                <h4 className="text-lg font-semibold mb-4">
                                    Supporters ({referral.supporters.length})
                                </h4>
                                <div className="grid gap-4">
                                    {referral.supporters.map((supporter) => (
                                        <div
                                            key={supporter.uid}
                                            className="bg-background rounded-xl border border-border p-4 transition-all duration-200 hover:shadow-lg hover:bg-card-hover"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                                <div className="font-medium text-primary capitalize">Nama Pengguna : {supporter.username}</div>
                                                <div className="text-sm text-text-dark">Code Referral : {supporter.referralCode}</div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                <div className="text-gray-500">Bergabung: {supporter.count} Orang</div>
                                                <div className="text-gray-500">Code Referral Affiliate: {supporter.referredBy}</div>
                                                <div className="text-gray-500">Tipe: {supporter.type}</div>
                                                <div className="text-gray-500 text-xs">
                                                    Joined: {formatDate(supporter.joinedAt as Timestamp)}
                                                </div>
                                            </div>
                                            {supporter.usedBy && supporter.usedBy.length > 0 && (
                                                <div className="mt-4">
                                                    <div className="text-sm font-medium mb-2">Used by:</div>
                                                    <div className="grid gap-2">
                                                        {supporter.usedBy.map((user, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="text-sm bg-background/20 hover:bg-background/30 transition-colors duration-200 p-3 rounded-lg border border-gray-100/5 dark:border-gray-800/50"
                                                            >
                                                                <div className="font-medium">{user.username}</div>
                                                                <div className="text-gray-400 text-xs mt-1">
                                                                    {formatDate(user.joinedAt as Timestamp)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
