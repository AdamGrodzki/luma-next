import Link from "next/link";
import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import InfoCard from "../../components/ui/InfoCard";
import type { Brand } from "@/src/types/contentful";

type Props = {
    brands: Brand[];
};

    export default function FeaturedBrands({ brands }: Props) {
    return (
        <section className="py-16">
        <Container>
            <SectionHeader
            eyebrow="Wybrane marki"
            title="Producenci"
            description="Najważniejsze brandy dostępne w katalogu."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {brands.slice(0, 4).map((brand) => (
                <InfoCard key={brand.id} href={`/brands/${brand.slug}`}>
                <h3 className="text-xl font-semibold text-[#f3eadf]">{brand.name}</h3>
                <p className="mt-3 text-sm text-[#9f978d]">
                    {brand.country ?? "Brak kraju"} • {brand.foundedYear ?? "Brak roku"}
                </p>
                </InfoCard>
            ))}
            </div>

            <div className="mt-8">
            <Link href="/brands" className="text-sm uppercase tracking-[0.16em] text-[#d2b08b]">
                Zobacz wszystkie marki →
            </Link>
            </div>
        </Container>
        </section>
    );
}