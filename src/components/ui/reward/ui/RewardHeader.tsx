import { motion } from 'framer-motion'

export default function RewardHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-16"
        >
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
                Reward
            </motion.h1>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-6"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            >
                Dapatkan berbagai keuntungan menarik melalui program reward kami
            </motion.p>
        </motion.div>
    )
}