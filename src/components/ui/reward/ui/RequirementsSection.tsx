import { motion } from 'framer-motion'

import { RequirementsSectionProps } from "@/components/ui/reward/lib/schema"

import { containerVariants, itemVariants } from "@/components/ui/reward/lib/animation"

export default function RequirementsSection({ reward }: RequirementsSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 sm:mt-20 bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-auto"
        >
            <div className="text-center mb-6 sm:mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{reward[0].title}</h2>
                <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-4"
            >
                {reward.map((item) => (
                    <div key={item.id}>
                        {item.syarat.map((syarat, index) => (
                            <motion.div
                                key={`syarat-${item.id}-${syarat.id || index}`}
                                variants={itemVariants}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 group/syarat"
                                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                            >
                                <div className="p-2 bg-indigo-100 rounded-lg group-hover/syarat:bg-indigo-600 transition-colors">
                                    <svg className="w-5 h-5 text-indigo-600 group-hover/syarat:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg text-gray-700 group-hover/syarat:text-gray-900">
                                    {syarat.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    )
}