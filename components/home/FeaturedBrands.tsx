import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
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
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#f3eadf]">
                                        {brand.name}
                                    </h3>
                                    <p className="mt-3 text-sm text-[#9f978d]">
                                        {brand.country ?? "Brak kraju"} •{" "}
                                        {brand.foundedYear ?? "Brak roku"}
                                    </p>
                                </div>

                                {brand.logoUrl ? (
                                    <Image
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-xl object-contain"
                                    />
                                ) : null}
                            </div>

                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#b9b0a5]">
                                {brand.description ?? "Brak opisu marki."}
                            </p>
                        </InfoCard>
                    ))}
                </div>
            </Container>
        </section>
    );
}