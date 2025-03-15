import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { themeOptions } from "../data/thema"

interface ThemeToggleProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function ThemeToggle({ isOpen, setIsOpen }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme()

    return (
        <div className="relative dropdown-trigger">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300"
                aria-label="Toggle theme"
            >
                {themeOptions.find(option => option.value === theme)?.icon || themeOptions[0].icon}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-44 py-2 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl shadow-neutral-200/10 dark:shadow-neutral-900/30 backdrop-blur-xl"
                    >
                        {themeOptions.map((option) => (
                            <motion.button
                                key={option.value}
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    setTheme(option.value)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300
                                    ${theme === option.value ? 'text-neutral-900 dark:text-neutral-100 font-medium' : 'text-neutral-600 dark:text-neutral-400'}`}
                            >
                                {option.icon}
                                {option.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}