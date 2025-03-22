import Link from 'next/link'

export const RegisterButton = () => {
    return (
        <Link
            href="/auth/register"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] relative overflow-hidden"
        >
            <span className="relative z-10">Daftar Sekarang</span>
            <svg xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1 relative z-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Link>
    )
}