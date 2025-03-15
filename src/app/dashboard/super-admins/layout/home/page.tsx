import React from 'react'

export const metadata = {
    title: 'Home | Super Admin',
    description: 'Halaman Home Super Admin',
}

import HomeLayout from "@/hooks/dashboard/super-admins/layout/home/HomeLayout"

export default function page() {
    return (
        <HomeLayout />
    )
}
