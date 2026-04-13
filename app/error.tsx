"use client";

export default function Error({
    error,
    reset,
    }: {
    error: Error;
    reset: () => void;
    }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--bg-dark)] px-6 text-[var(--text-primary)]">
            <div className="w-full max-w-2xl rounded-[28px] border border-[var(--border-default)] bg-[var(--bg-card)] p-10 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
            Luma
            </p>

                <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--bg-darker)] shadow-[0_0_40px_rgba(201,159,106,0.08)]">
                    <span className="font-serif text-3xl text-[var(--accent-primary)]">!</span>
            </div>

                <h1 className="mt-8 font-serif text-5xl leading-tight text-[var(--text-primary)]">
            Coś poszło nie tak
            </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
            Nie udało się załadować tej części aplikacji. Spróbuj ponownie albo
            wróć do wcześniejszej strony.
            </p>

                <div className="mt-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-darker)] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Szczegóły błędu
            </p>

            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-[#b8aea2]">
                {error.message}
            </pre>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
            <button
                onClick={reset}
                className="rounded-full border border-[#8e6a47] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
            >
                Spróbuj ponownie
            </button>

            <a
                href="/"
                className="inline-flex rounded-full border border-[#2d241c] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#cbb9a5] transition hover:border-[#6b573f]"
            >
                Wróć na start
            </a>
            </div>
        </div>
        </main>
    );
}