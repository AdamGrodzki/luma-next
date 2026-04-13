export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--bg-dark)] px-6 text-[var(--text-primary)]">
        <div className="flex flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
                    <div className="absolute h-24 w-24 rounded-full border border-[var(--border-light)] bg-[var(--bg-card)] shadow-[0_0_60px_rgba(201,159,106,0.12)]" />
                    <div className="absolute h-24 w-24 animate-spin rounded-full border-2 border-[var(--border-light)] border-t-[var(--accent-primary)]" />
                    <div className="absolute h-14 w-14 rounded-full border border-[var(--border-dark)] bg-[var(--bg-darker)]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)]" />
            </div>

                <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)]">
            Luma
            </p>

                <p className="mt-3 text-sm text-[var(--text-muted)]">
            Przygotowujemy dane i widoki.
            </p>
        </div>
        </main>
    );
}