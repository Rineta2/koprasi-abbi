export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
}

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
}

export const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
}

export const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
}