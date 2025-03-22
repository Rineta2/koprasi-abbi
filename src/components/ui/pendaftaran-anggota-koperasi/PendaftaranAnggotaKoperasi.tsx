"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { PendaftaranAnggotaKoperasiType } from '@/components/ui/pendaftaran-anggota-koperasi/lib/schema'

import { FetchPendaftaranAnggotaKoperasi } from '@/components/ui/pendaftaran-anggota-koperasi/lib/FetchPendaftaranAnggotaKoperasi'

import PendaftaranAnggotaKoperasiSkeleton from '@/components/ui/pendaftaran-anggota-koperasi/PendaftaranAnggotaKoperasikelaton'

import { CardDecorative } from '@/components/ui/pendaftaran-anggota-koperasi/ui/CardDecorative'

import { CardContent } from '@/components/ui/pendaftaran-anggota-koperasi/ui/Card'

export default function PendaftaranAnggotaKoperasi() {
    const [pendaftaranAnggotaKoperasi, setPendaftaranAnggotaKoperasi] = useState<PendaftaranAnggotaKoperasiType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchPendaftaranAnggotaKoperasi((newPendaftaranAnggotaKoperasi) => {
            setPendaftaranAnggotaKoperasi(newPendaftaranAnggotaKoperasi);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PendaftaranAnggotaKoperasiSkeleton />;
    }

    return (
        <section className="relative min-h-screen overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/90 to-background/50" id="register">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="flex flex-col space-y-10 md:space-y-12 lg:space-y-16">
                    {pendaftaranAnggotaKoperasi.map((item) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            key={item.id}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 relative overflow-hidden group"
                        >
                            <CardDecorative />
                            <CardContent item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
