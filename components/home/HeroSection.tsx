import Link from "next/link";
import Container from "@/components/ui/Container";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden border-b border-[var(--border-light)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,159,106,0.12),transparent_40%)]" />
            <Container className="relative py-12 sm:py-16 md:py-24 lg:py-32">
                <div className="max-w-4xl">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
                        Luma Camera Encyclopedia
                    </p>

                    <h1 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.05] text-[var(--text-primary)]">
                        Discover camera brands, models, and history.
                    </h1>

                    <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-[var(--text-muted)]">
                        A modern camera catalog built with Next.js and powered by
                        Contentful. Explore manufacturers, compare systems, and browse
                        the collection by sensor.
                    </p>

                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                        <Link
                            href="/collection"
                            className="rounded-full border border-[var(--accent-primary)] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-primary)] transition hover:bg-[var(--border-default)]"
                        >
                            Browse Collection
                        </Link>

                        <Link
                            href="/brands"
                            className="rounded-full border border-[var(--border-default)] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)]"
                        >
                            View Brands
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}