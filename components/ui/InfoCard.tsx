import Link from "next/link";

type Props = {
    href?: string;
    children: React.ReactNode;
    className?: string;
    };

    export default function InfoCard({ href, children, className = "" }: Props) {
    const base =
        "rounded-lg sm:rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5 transition hover:border-[var(--accent-primary)] hover:bg-[var(--bg-card)]";

    if (href) {
        return (
        <Link href={href} className={`${base} ${className}`}>
            {children}
        </Link>
        );
    }

    return <div className={`${base} ${className}`}>{children}</div>;
}