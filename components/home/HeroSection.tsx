import Link from "next/link";
import Container from "@/components/ui/Container";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden border-b border-[#1b1612]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,159,106,0.12),transparent_40%)]" />
            <Container className="relative py-12 sm:py-16 md:py-24 lg:py-32">
                <div className="max-w-4xl">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#c79d6a]">
                        Luma Camera Encyclopedia
                    </p>

                    <h1 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.05] text-[#f3eadf]">
                        Odkrywaj marki, modele i historię aparatów.
                    </h1>

                    <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-[#9f978d]">
                        Nowoczesny katalog aparatów zbudowany w Next.js i zasilany przez
                        Contentful. Przeglądaj producentów, porównuj systemy i eksploruj
                        kolekcję według sensora.
                    </p>

                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                        <Link
                            href="/kolekcja"
                            className="rounded-full border border-[#8e6a47] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[#f3eadf] transition hover:bg-[#141210]"
                        >
                            Przeglądaj kolekcję
                        </Link>

                        <Link
                            href="/brands"
                            className="rounded-full border border-[#2e241a] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[#cbb9a5] transition hover:border-[#6b573f]"
                        >
                            Zobacz marki
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}