"use client"

import dynamic from 'next/dynamic'

const Providers = dynamic(() => import('@/router/Provider'), {
    ssr: false
})

const Pathname = dynamic(() => import('@/router/Pathname'), {
    ssr: false
})

export default function Components({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <Pathname>
                {children}
            </Pathname>
        </Providers>
    )
}
