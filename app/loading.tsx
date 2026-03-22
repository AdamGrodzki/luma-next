export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#040607] px-6 text-[#f3eadf]">
        <div className="flex flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full border border-[#2b2118] bg-[#0a0c0e] shadow-[0_0_60px_rgba(201,159,106,0.12)]" />
            <div className="absolute h-24 w-24 animate-spin rounded-full border-2 border-[#2b2118] border-t-[#c99f6a]" />
            <div className="absolute h-14 w-14 rounded-full border border-[#1c1611] bg-[#050607]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#c99f6a]" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-[#a88a69]">
            Luma
            </p>

            <p className="mt-3 text-sm text-[#9f978d]">
            Przygotowujemy dane i widoki.
            </p>
        </div>
        </main>
    );
}