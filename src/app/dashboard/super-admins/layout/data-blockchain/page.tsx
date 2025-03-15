import React from 'react'

export const metadata = {
    title: 'Data BlockChain | Koperasi ABBI',
    description: 'Halaman Data BlockChain Super Admin',
}

import DataBlockcheinLayout from "@/hooks/dashboard/super-admins/layout/data-blockchain/DataBlockcheinLayout"

export default function page() {
    return (
        <DataBlockcheinLayout />
    )
}
