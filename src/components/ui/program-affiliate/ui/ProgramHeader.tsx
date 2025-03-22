import { motion } from "framer-motion"

import { ProgramHeaderProps } from "@/components/ui/program-affiliate/lib/schema"

export const ProgramHeader = ({ title, description }: ProgramHeaderProps) => {
    return (
        <motion.div
            className='mb-12 md:mb-16 lg:mb-20 max-w-3xl relative'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Decorative line */}
            <motion.svg
                className="absolute -left-8 top-0 h-full w-4 text-purple-500/20"
                viewBox="0 0 10 100"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <line x1="5" y1="0" x2="5" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </motion.svg>

            <motion.p
                className='text-primary text-sm mb-2 font-medium tracking-wider uppercase flex items-center gap-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {title}
            </motion.p>

            <motion.h2
                className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {description}
            </motion.h2>
        </motion.div>
    )
}