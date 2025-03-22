import { motion } from "framer-motion"

import Image from "next/image"

import { BenefitsGridProps } from "@/components/ui/program-affiliate/lib/schema"

export const BenefitsGrid = ({ benefits }: BenefitsGridProps) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
            {benefits.map((benefit, index) => (
                <motion.div
                    key={benefit.id || index}
                    className='group backdrop-blur-sm bg-[#1c1c1f]/80 rounded-2xl p-4 sm:p-6 lg:p-8 
                             border border-gray-800/50 hover:border-primary 
                             transition-all duration-300
                             hover:translate-y-[-2px] relative overflow-hidden'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {/* Benefit content */}
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 relative z-10'>
                        <div className='flex-1 text-center sm:text-left'>
                            <motion.h3
                                className='text-white text-lg sm:text-xl font-semibold mb-3 
                                         group-hover:text-primary transition-colors flex items-center gap-2 justify-center sm:justify-start'
                            >
                                {benefit.title}
                            </motion.h3>
                        </div>
                        <motion.div className='flex-shrink-0'>
                            <div className='relative overflow-hidden rounded-xl'>
                                <Image
                                    src={benefit.imageUrl}
                                    alt={benefit.title}
                                    width={100}
                                    height={100}
                                    className='transform transition-transform duration-300 
                                             group-hover:scale-110'
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}