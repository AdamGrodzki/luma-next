import Link from "next/link";
import Image from "next/image";

type Props = {
  brandName: string;
  totalCount: number;
  brandSlug?: string;
  logoUrl?: string | null;
  isGlobalView?: boolean;
};

export default function CollectionHeader({
  brandName,
  totalCount,
  brandSlug,
  logoUrl,
  isGlobalView = false,
}: Props) {
  return (
    <div className="flex flex-col gap-5 border-b border-[var(--border-light)] pb-7 md:flex-row md:items-start md:justify-between">
      <div className="flex items-center gap-6">
        {isGlobalView ? (
          // Global view - show a styled title without logo box
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--accent-primary)] bg-gradient-to-br from-[var(--special-brand-bg)] to-[var(--bg-darker)]">
              <span className="text-3xl">🌐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {brandName}
              </h1>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Znaleziono {totalCount} {totalCount === 1 ? 'model' : 'modeli'}
              </div>
            </div>
          </div>
        ) : (
          // Brand-specific view - show logo box
          <>
              <div className="flex h-20 w-[230px] items-center justify-center rounded-md bg-white px-6 shadow-md">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={`${brandName} logo`}
                    width={180}
                    height={60}
                    className="h-auto max-h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="text-5xl font-bold italic tracking-tight text-[#cf0d15] md:text-6xl">
                    {brandName}
                  </span>
                )}
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                  O producencie →
                </div>
                <div className="mt-1 text-xl text-[var(--text-primary)]">
                  Znaleziono {totalCount} modeli
                </div>
              </div>
          </>
        )}
      </div>

      {!isGlobalView && brandSlug && (
        <Link
          href={`/brands/${brandSlug}`}
          className="rounded-full border border-[var(--special-badge-border)] px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
        >
          Zobacz profil marki
        </Link>
      )}
    </div>
  );
}