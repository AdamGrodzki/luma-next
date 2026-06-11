import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

const BASE_CLASSES =
  "rounded-lg sm:rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5 transition hover:border-[var(--accent-primary)] hover:bg-[var(--bg-card)]";

export default function InfoCard({ href, children, className = "" }: Props) {
  const classes = `${BASE_CLASSES} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}