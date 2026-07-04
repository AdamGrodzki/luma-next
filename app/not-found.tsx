import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--bg-dark)] px-6 text-[var(--text-primary)]">
            <div className="w-full max-w-2xl rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-card)] p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
            Luma
            </p>

                <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--bg-darker)] shadow-[0_0_40px_rgba(201,159,106,0.08)]">
                    <span className="font-serif text-3xl text-[var(--accent-primary)]">404</span>
            </div>

            <h1 className="mt-8 font-serif text-5xl leading-tight text-[#f3eadf]">
            Page Not Found
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#a79d92]">
            This address does not exist, has been removed, or points to an item
            that is not yet in the catalog.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
                href="/"
                className="inline-flex rounded-full border border-[#8e6a47] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
            >
                Home
            </Link>

            <Link
                href="/collection"
                className="inline-flex rounded-full border border-[#2d241c] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#cbb9a5] transition hover:border-[#6b573f]"
            >
                View Collection
            </Link>
            </div>
        </div>
        </main>
    );
}