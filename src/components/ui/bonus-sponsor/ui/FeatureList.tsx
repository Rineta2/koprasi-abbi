import { motion } from 'framer-motion'

export const FeatureList = () => {
    return (
        <motion.div
            className="space-y-3 text-sm text-text/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
        >
            {['Bonus New Member', 'Bonus Deposit', 'Bonus Cashback'].map((feature, i) => (
                <motion.div
                    key={i}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + (i * 0.1) }}
                    viewport={{ once: true }}
                >
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                </motion.div>
            ))}
        </motion.div>
    )
}