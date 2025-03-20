export const ViewIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" />
    </svg>
);

export const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
        success: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        pending: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        failed: {
            bg: 'bg-rose-50',
            text: 'text-rose-700',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text} transition-colors duration-200`}>
            {config.icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);