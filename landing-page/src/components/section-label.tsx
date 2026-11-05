export default function SectionLabel({
    children,
    className = "text-primary",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={`flex items-center gap-2 text-sm ${className}`}>
            <span className="hidden h-px w-6 bg-current" aria-hidden />
            {children}
        </p>
    );
}
