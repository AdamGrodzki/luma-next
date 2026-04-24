type Props = {
    children: React.ReactNode;
    variant?: 'default' | 'secondary';
};

export default function Badge({ children, variant = 'default' }: Props) {
    const baseClasses = "inline-block rounded-full border text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] px-2 py-0.5 sm:px-3 sm:py-1 transition-colors duration-200";

    const variantClasses = {
        default: "border-[var(--special-badge-border)] bg-[var(--special-badge-bg)] text-[var(--accent-secondary)]",
        secondary: "border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-muted)]"
    };

    return (
      <span className={`${baseClasses} ${variantClasses[variant]}`}>
          {children}
      </span>
  );
}