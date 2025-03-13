import React from 'react'

import { Metadata } from 'next'

import RegisterLayout from '@/components/auth/register/RegisterLayout'

export const metadata: Metadata = {
    title: 'Register - Koprasi Abbi',
    description: 'Halaman register untuk membuat akun baru',
}

export default function Register() {
    return (
        <RegisterLayout />
    )
}
