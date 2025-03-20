import React from 'react'

import TransactionUnpaid from '@/hooks/dashboard/user/transaksi/unpaid/TransactionUnpaid';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Transaksi Belum Dibayar',
    description: 'Halaman transaksi belum dibayar',
}

export default function TransactionUnpaidPage() {
    return (
        <TransactionUnpaid />
    )
}
