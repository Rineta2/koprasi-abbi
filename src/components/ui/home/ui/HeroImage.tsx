import { motion } from 'framer-motion'

import Image from 'next/image'

import { HeroImageProps } from '@/components/ui/home/lib/schema'

export default function HeroImage({ home }: HeroImageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
            whileHover={{ scale: 1.02 }}
            className='w-full h-full flex items-center justify-center mt-8 lg:mt-0'
        >
            <div className="relative w-[90%] sm:w-[80%] lg:w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-[120px] rounded-full animate-pulse" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary-dark/30 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
                <Image
                    src={home.imageUrl}
                    alt={home.title}
                    width={600}
                    height={600}
                    className="relative z-10 drop-shadow-2xl w-full h-auto"
                    priority
                />
            </div>
        </motion.div>
    )
}