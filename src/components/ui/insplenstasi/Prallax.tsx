"use client"

import Image from "next/image"
import imgInsplentasi from "@/base/assets/insplentasi/bg.jpg"

interface ParallaxProps {
    offsetY: number;
}

export default function Parallax({ offsetY }: ParallaxProps) {
    console.log('Parallax rendered, offsetY:', offsetY);
    console.log('Image source:', imgInsplentasi);

    return (
        <div
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: -1 }}
        >
            <div
                className="w-full h-full relative"
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                    willChange: 'transform'
                }}
            >
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative w-full h-full">
                    <Image
                        src={imgInsplentasi}
                        alt='insplentasi'
                        fill
                        priority
                        loading="eager"
                        quality={100}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            zIndex: 1
                        }}
                        onLoad={() => console.log('Image loaded successfully')}
                        onError={(e) => console.error('Image loading error:', e)}
                    />
                </div>
            </div>
        </div>
    )
}