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
        <section className="border-t border-[#181512] py-16">
            <Container>
                <SectionHeader
                    eyebrow="Wybrane modele"
                    title="Aparaty"
                    description="Kilka modeli, od których warto zacząć eksplorację katalogu."
                />

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {cameras.slice(0, 6).map((camera) => (
                        <InfoCard key={camera.id} href={`/cameras/${camera.slug}`}>
                            <div className="overflow-hidden rounded-[18px] border border-[#1f1a14] bg-[#0f1113]">
                                {camera.heroImageUrl ? (
                                    <Image
                                        src={camera.heroImageUrl}
                                        alt={camera.name}
                                        width={900}
                                        height={700}
                                        className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-56 items-center justify-center text-sm text-[#7f776d]">
                                        Brak zdjęcia
                                    </div>
                                )}
                            </div>

                            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#8e867d]">
                                {camera.brand.name}
                            </p>

                            <h3 className="mt-2 text-2xl font-semibold text-[#f3eadf]">
                                {camera.name}
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-2">
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