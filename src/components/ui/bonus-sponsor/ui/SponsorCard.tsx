import { motion } from 'framer-motion'

import Image from 'next/image'

import { SponsorCardProps } from '@/components/ui/bonus-sponsor/lib/schema'

import { FeatureList } from '@/components/ui/bonus-sponsor/ui/FeatureList'

export const SponsorCard = ({ item, index }: SponsorCardProps) => {
    return (
        <motion.div
            className="flex flex-col lg:flex-row gap-12 items-center relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                className={`flex flex-col space-y-8 lg:w-1/2 ${index % 2 === 0 ? '' : 'lg:order-2'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                {/* Title Section */}
                <motion.div
                    className="relative p-6 bg-primary/5 rounded-2xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className='text-3xl md:text-4xl font-bold tracking-tight text-text'
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {item.title}
                    </motion.h3>
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/30"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/30"></div>
                </motion.div>

                {/* Tags */}
                <motion.div
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    {['Sponsor Resmi', 'Partner Terpercaya', 'Bonus Referral'].map((tag, i) => (
                        <motion.span
                            key={i}
                            className="px-5 py-2 text-sm font-medium rounded-full
                                bg-primary/10 text-primary hover:bg-primary/15 transition-all
                                backdrop-blur-sm hover:scale-105 cursor-default group
                                border border-primary/20 relative overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
                            viewport={{ once: true }}
                        >
                            <span className="relative z-10">
                                <span className="mr-2 text-primary/70">◆</span>{tag}
                            </span>
                            <span className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </motion.span>
                    ))}
                </motion.div>

                <FeatureList />
            </motion.div>

            {/* Image Section */}
            <motion.div
                className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-2' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <div className="relative rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10"></div>
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                        fetchPriority="high"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}