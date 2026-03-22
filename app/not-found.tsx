import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#040607] px-6 text-[#f3eadf]">
        <div className="w-full max-w-2xl rounded-[28px] border border-[#1f1a14] bg-[#0a0c0e] p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[#a88a69]">
            Luma
            </p>

            <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#2c2218] bg-[#050607] shadow-[0_0_40px_rgba(201,159,106,0.08)]">
            <span className="font-serif text-3xl text-[#c99f6a]">404</span>
            </div>

            <h1 className="mt-8 font-serif text-5xl leading-tight text-[#f3eadf]">
            Nie znaleziono strony
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#a79d92]">
            Ten adres nie istnieje, został usunięty albo wskazuje na element,
            którego nie ma jeszcze w katalogu.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
                href="/"
                className="inline-flex rounded-full border border-[#8e6a47] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
            >
                Strona główna
            </Link>

            <Link
                href="/kolekcja"
                className="inline-flex rounded-full border border-[#2d241c] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#cbb9a5] transition hover:border-[#6b573f]"
            >
                Zobacz kolekcję
            </Link>
            </div>
        </div>
        </main>
    );
}