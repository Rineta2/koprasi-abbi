import { motion } from 'framer-motion'

import Image from 'next/image'

import { HeaderSectionProps } from '@/components/ui/legalisasi/lib/schema'

export default function HeaderSection({ data }: HeaderSectionProps) {
    return (
        <>
            <div className='flex flex-col items-center justify-center space-y-6 mb-16'>
                <div className="relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                                bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                                bg-clip-text text-transparent
                                relative z-10'
                    >
                        {data.companyName}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="absolute -top-6 -left-6 w-12 h-12 bg-primary/5 rounded-full blur-xl"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"
                    ></motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <h3 className='text-xl md:text-2xl font-medium text-gray-600/90 text-center
                                px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 via-white to-gray-50
                                border border-gray-100 shadow-sm'>
                        {data.legalType}
                    </h3>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="absolute inset-0 bg-primary/5 rounded-full blur-md -z-10"
                    ></motion.div>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
                ></motion.div>
            </div>

            <div className='flex justify-center items-center'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={data.imageUrl}
                        alt={data.companyName}
                        width={500}
                        height={500}
                        className='relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-[2rem]'
                    />
                </motion.div>
            </div>
        </>
    )
}