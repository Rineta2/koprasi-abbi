import { motion } from 'framer-motion'

import Image from 'next/image'

import { RegisterButton } from '@/components/ui/pendaftaran-anggota-koperasi/ui/RegisterButton'

import { CardContentProps } from '@/components/ui/pendaftaran-anggota-koperasi/lib/schema'

export const CardContent = ({ item }: CardContentProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
            <div className="flex-1 space-y-6 md:space-y-8">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70"
                >
                    {item.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose"
                >
                    {item.description}
                </motion.p>
                <motion.div>
                    <RegisterButton />
                </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-full sm:w-auto"
                >
                    <Image
                        src={item.svgUrl}
                        alt={item.title}
                        width={240}
                        height={240}
                        className="w-full sm:w-[200px] md:w-[240px] rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full sm:w-auto"
                >
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={240}
                        height={240}
                        className="w-full sm:w-[200px] md:w-[240px] rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                </motion.div>
            </div>
        </div>
    )
}