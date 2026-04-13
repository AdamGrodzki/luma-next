type Props = {
    children: React.ReactNode;
    };

    export default function Badge({ children }: Props) {
    return (
        <span className="rounded-full border border-[var(--special-badge-border)] bg-[var(--special-badge-bg)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--accent-secondary)]">
        {children}
        </span>
    );
}