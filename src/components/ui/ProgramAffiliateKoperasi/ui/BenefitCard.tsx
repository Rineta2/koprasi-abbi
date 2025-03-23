import { motion } from 'framer-motion';

import Image from 'next/image';

import { BenefitCardProps } from '@/components/ui/ProgramAffiliateKoperasi/lib/schema';

export default function BenefitCard({ benefit, index }: BenefitCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div className="h-full rounded-[2rem] bg-white p-6 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className="mb-8 overflow-hidden rounded-[1.5rem]"
                >
                    <div className="relative w-full pt-[75%] bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 group-hover:from-violet-100 group-hover:via-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                        <Image
                            src={benefit.imageUrl}
                            alt={benefit.title}
                            fill
                            className="object-contain p-8 transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 + 0.3 }}
                    className="space-y-4"
                >
                    {/* Content section */}
                    <div className="flex items-center justify-between">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                            className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                        >
                            {benefit.title}
                        </motion.h3>
                        <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"
                        >
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.span>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className="text-blue-600 text-lg font-semibold"
                    >
                        {benefit.price}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                        className="text-gray-600 leading-relaxed text-lg"
                    >
                        {benefit.text}
                    </motion.p>
                </motion.div>

                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-violet-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}