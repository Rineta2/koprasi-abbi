import React from 'react'

import LoginLayout from "@/components/auth/login/LoginLayout"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login | Koperasi ABBI',
    description: 'Halaman Login Koperasi ABBI',
}

export default function Login() {
    return (
        <LoginLayout />
    )
}
