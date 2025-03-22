import { motion } from 'framer-motion'

import Image from "next/image"

import { PrizePoolItemProps } from "@/components/ui/prize-pool/lib/schema"

import { itemVariants, contentVariants, imageVariants } from "@/components/ui/prize-pool/lib/animation"

export const PrizePoolItem = ({ item }: PrizePoolItemProps) => (
    <motion.div
        className='flex flex-col md:flex-row items-center justify-center gap-8 mb-24 last:mb-0'
        variants={itemVariants}
    >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full'>
            <motion.div
                className="space-y-8 md:pr-6"
                variants={contentVariants}
            >
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
                    {item.title}
                </h2>
                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </motion.div>

            <motion.div
                className="relative"
                variants={imageVariants}
            >
                <div className="relative">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                    <svg className="absolute -top-4 -right-4 w-10 h-10 text-blue-600 opacity-75 rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>
            </motion.div>
        </div>
    </motion.div>
)