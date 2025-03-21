import { motion } from 'framer-motion'

import React from 'react'

export default function Spinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <motion.div
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative">
                    {/* Outer spinning ring */}
                    <motion.div
                        className="w-24 h-24 rounded-full border-4 border-cyan-500/20"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    />

                    {/* Inner spinning ring */}
                    <motion.div
                        className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-cyan-500 border-r-cyan-500 border-b-transparent border-l-transparent"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Center dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Loading text with typing effect */}
                <div className="flex items-center gap-2">
                    <motion.p
                        className="text-cyan-500 font-medium text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading
                    </motion.p>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((index) => (
                            <motion.span
                                key={index}
                                className="w-2 h-2 bg-cyan-500 rounded-full"
                                animate={{
                                    y: ["0%", "-50%", "0%"],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: index * 0.1,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Optional subtle background glow */}
                <motion.div
                    className="absolute w-48 h-48 bg-cyan-500/5 rounded-full blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
    )
}
