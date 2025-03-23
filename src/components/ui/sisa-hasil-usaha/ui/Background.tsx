import Image from 'next/image'

import bg from "@/base/assets/SisaHasilUsaha/bg.jpg"

export function BackgroundSection() {
    return (
        <div className='absolute inset-0 w-full h-full -z-10'>
            <Image
                src={bg}
                alt='background'
                fill
                sizes="100vw"
                quality={100}
                priority
                className='object-cover object-center brightness-[0.4] transform scale-105 transition-transform duration-1000'
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
        </div>
    )
}