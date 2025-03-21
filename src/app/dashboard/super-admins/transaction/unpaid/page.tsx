import React from 'react'

import UnpaidLayout from "@/hooks/dashboard/super-admins/transaction/unpaid/UnpaidLayout"

export const metadata = {
    title: 'Unpaid Transaction | Koperasi ABBI',
    description: 'Halaman Unpaid Transaction Koperasi ABBI',
}

export default function Unpaid() {
    return (
        <UnpaidLayout />
    )
}
