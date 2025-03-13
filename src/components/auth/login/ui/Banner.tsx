import React from 'react'

import Image from 'next/image'

import loginImg from "@/base/assets/auth/login.png"

export default function WelcomeBanner() {
    return (
        <div className="hidden lg:flex items-center justify-center p-12 relative">
            {/* Image container */}
            <div className="relative w-full h-full hidden lg:block">
                <Image
                    src={loginImg}
                    alt='sign in image'
                    className='object-contain'
                    priority
                    fill
                />
            </div>
        </div>
    )
}