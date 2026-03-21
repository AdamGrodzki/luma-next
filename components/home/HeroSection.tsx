import Link from "next/link";
import Container from "../../components/ui/Container";

export default function HeroSection() {
    return (
        <section className="border-b border-[#1b1612] py-20">
        <Container>
            <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c79d6a]">
                Luma Camera Encyclopedia
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-tight text-[#f3eadf] md:text-7xl">
                Odkrywaj marki, modele i historię aparatów.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9f978d]">
                Nowoczesny katalog aparatów zbudowany w Next.js i zasilany przez Contentful.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                href="/kolekcja"
                className="rounded-full border border-[#8e6a47] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
                >
                Przeglądaj kolekcję
                </Link>

                <Link
                href="/brands"
                className="rounded-full border border-[#2e241a] px-6 py-3 text-sm uppercase tracking-[0.14em] text-[#cbb9a5] transition hover:border-[#6b573f]"
                >
                Zobacz marki
                </Link>
            </div>
            </div>
        </Container>
        </section>
    );
}