export const CardDecorative = () => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Gradient Blobs */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            {/* Dot Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:16px_16px]" />
        </div>
    )
}