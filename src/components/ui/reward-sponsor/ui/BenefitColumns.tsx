import { motion } from 'framer-motion'

import Image from "next/image"

import { BenefitColumnsProps } from "@/components/ui/reward-sponsor/lib/schema"

import { containerVariants, itemVariants } from "@/components/ui/reward-sponsor/lib/animation"

export default function BenefitColumns({ reward }: BenefitColumnsProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-4 sm:gap-6 lg:gap-12'>
            {/* Left Column */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group h-full w-full bg-white/90 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
                    {reward.map((item) => (
                        <div key={item.id}>
                            {item.textLeft.map((text, index) => (
                                <motion.div
                                    key={`left-${item.id}-${text.id || index}`}
                                    variants={itemVariants}
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer group/item"
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                >
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover/item:bg-indigo-600"></span>
                                    <span className="text-lg font-medium text-gray-700 group-hover/item:text-indigo-600">
                                        {text.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Center Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="relative group/image w-full max-w-md mx-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover/image:opacity-30 transition-all duration-500"></div>
                <div className="relative p-2 bg-white rounded-3xl shadow-2xl transform group-hover/image:scale-[1.02] transition-all duration-500">
                    <Image
                        src={reward[0].imageUrl}
                        alt={reward[0].title}
                        width={500}
                        height={500}
                        className="rounded-2xl w-full h-auto"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group h-full w-full bg-white/90 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
                    {reward.map((item) => (
                        <div key={item.id}>
                            {item.textRight.map((text, index) => (
                                <motion.div
                                    key={`right-${item.id}-${text.id || index}`}
                                    variants={itemVariants}
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 cursor-pointer group/item"
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                >
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover/item:bg-indigo-600"></span>
                                    <span className="text-lg font-medium text-gray-700 group-hover/item:text-indigo-600">
                                        {text.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}