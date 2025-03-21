export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
            duration: 0.8
        }
    }
};

export const cardContentVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 120,
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const headingVariants = {
    hidden: {
        opacity: 0,
        x: -30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 120,
            duration: 0.6,
            ease: "easeOut"
        }
    }
};