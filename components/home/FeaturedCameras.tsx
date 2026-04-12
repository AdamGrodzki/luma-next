import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoCard from "@/components/ui/InfoCard";
import Badge from "@/components/ui/Badge";
import type { Camera } from "@/src/types/contentful";

type Props = {
    cameras: Camera[];
};

export default function FeaturedCameras({ cameras }: Props) {
    return (
        <section className="border-t border-[#181512] py-12 sm:py-16 md:py-20">
            <Container>
                <SectionHeader
                    eyebrow="Wybrane modele"
                    title="Aparaty"
                    description="Kilka modeli, od których warto zacząć eksplorację katalogu."
                />

                <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {cameras.slice(0, 6).map((camera, index) => (
                        <InfoCard key={camera.id} href={`/cameras/${camera.slug}`}>
                            <div className="overflow-hidden rounded-[18px] border border-[#1f1a14] bg-[#0f1113]">
                                {camera.heroImageUrl ? (
                                    <Image
                                        src={camera.heroImageUrl}
                                        alt={camera.name}
                                        width={900}
                                        height={700}
                                        priority={index < 3}
                                        loading={index < 3 ? "eager" : "lazy"}
                                        className="h-40 sm:h-48 md:h-56 w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                ) : (
                                        <div className="flex h-40 sm:h-48 md:h-56 items-center justify-center text-xs text-[#7f776d]">
                                        Brak zdjęcia
                                    </div>
                                )}
                            </div>

                            <p className="mt-3 sm:mt-4 text-xs uppercase tracking-[0.16em] text-[#8e867d]">
                                {camera.brand.name}
                            </p>

                            <h3 className="mt-2 text-base sm:text-lg md:text-2xl font-semibold text-[#f3eadf]">
                                {camera.name}
                            </h3>

                            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                                {camera.cameraType && <Badge>{camera.cameraType}</Badge>}
                                {camera.sensorFormat && <Badge>{camera.sensorFormat}</Badge>}
                            </div>
                        </InfoCard>
                    ))}
                </div>
            </Container>
        </section>
    );
}