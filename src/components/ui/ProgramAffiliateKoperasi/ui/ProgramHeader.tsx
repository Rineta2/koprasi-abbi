import { motion } from 'framer-motion';

import { HeaderProps } from '@/components/ui/ProgramAffiliateKoperasi/lib/schema';

export default function Header({ title }: HeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
        >
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 text-blue-600 font-medium mb-6"
            >
                Program Affiliate
            </motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl xl:text-6xl font-bold mb-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
            >
                {title}
            </motion.h1>

            {/* Header Decorative Lines */}
            <motion.svg
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 text-blue-100"
                viewBox="0 0 100 100"
            >
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
            </motion.svg>
            <motion.svg
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 text-blue-100"
                viewBox="0 0 100 100"
            >
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
            </motion.svg>
        </motion.div>
    );
}