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
        <section className="py-12 sm:py-16 md:py-20">
            <Container>
                <SectionHeader
                    eyebrow="Wybrane marki"
                    title="Producenci"
                    description="Najważniejsze brandy dostępne w katalogu."
                />

                <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {brands.slice(0, 4).map((brand) => (
                        <InfoCard key={brand.id} href={`/brands/${brand.slug}`}>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-2xl font-semibold text-[#f3eadf]">
                                        {brand.name}
                                    </h3>
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#9f978d] truncate">
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
                                        loading="lazy"
                                        className="h-12 sm:h-14 w-12 sm:w-14 rounded-xl object-contain flex-shrink-0"
                                    />
                                ) : null}
                            </div>

                            <p className="mt-3 sm:mt-4 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm leading-5 sm:leading-6 text-[#b9b0a5]">
                                {brand.description ?? "Brak opisu marki."}
                            </p>
                        </InfoCard>
                    ))}
                </div>
            </Container>
        </section>
    );
}