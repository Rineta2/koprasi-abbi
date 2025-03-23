import { motion } from 'framer-motion'

import Image from 'next/image'

import { SisaHasilUsahaCardProps } from '@/components/ui/sisa-hasil-usaha/lib/SisaHasilUsaha'

export function SisaHasilUsahaCard({ item, index }: SisaHasilUsahaCardProps) {
    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 lg:p-12 border border-white/20 shadow-2xl mb-12 last:mb-0 hover:bg-white/15 transition-all duration-300 group">
            <div className="relative">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center"
                >
                    {item.title}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl font-semibold text-white/90 mb-8 text-center leading-relaxed"
                >
                    {item.text}
                </motion.h2>

                <div className="relative mb-8 overflow-hidden rounded-2xl group h-[120px] sm:h-[250px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className='object-cover'
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/80 leading-relaxed text-center px-4 md:px-8"
                >
                    {item.description}
                </motion.p>
            </div>
        </div>
    )
}