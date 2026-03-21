import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import InfoCard from "../../components/ui/InfoCard";
import Badge from "../../components/ui/Badge";
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
                <p className="text-sm uppercase tracking-[0.14em] text-[#8e867d]">
                    {camera.brand.name}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-[#f3eadf]">
                    {camera.name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                    {camera.cameraType ? <Badge>{camera.cameraType}</Badge> : null}
                    {camera.sensorFormat ? <Badge>{camera.sensorFormat}</Badge> : null}
                </div>
                </InfoCard>
            ))}
            </div>
        </Container>
        </section>
    );
}