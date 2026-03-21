import Link from "next/link";

type Props = {
    href?: string;
    children: React.ReactNode;
    className?: string;
    };

    export default function InfoCard({ href, children, className = "" }: Props) {
    const base =
        "rounded-[24px] border border-[#221b14] bg-[#0a0c0e] p-5 transition hover:border-[#6b573f] hover:bg-[#0d1012]";

    if (href) {
        return (
        <Link href={href} className={`${base} ${className}`}>
            {children}
        </Link>
        );
    }

    return <div className={`${base} ${className}`}>{children}</div>;
}