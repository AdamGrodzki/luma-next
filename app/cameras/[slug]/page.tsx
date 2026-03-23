import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCameraBySlug,
  getCameras,
  getRelatedCameras,
} from "@/src/lib/contentful/cameras";
import { CameraDetailView } from "@/components/camera-detail/camera-detail-view";
import { mapContentfulCameraToDetail } from "@/src/lib/contentful/mappers";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cameras = await getCameras();
  return cameras.map((camera) => ({ slug: camera.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) {
    return {
      title: "Camera not found | Luma",
    };
  }

  return {
    title: `${camera.name} | ${camera.brand.name} | Luma`,
    description:
      camera.description ??
      `${camera.name} by ${camera.brand.name}. Explore specs, sensor format and gallery.`,
  };
}

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params;
  const camera = await getCameraBySlug(slug);

  if (!camera) notFound();

  const relatedCameras = await getRelatedCameras(camera.slug, {
    brandSlug: camera.brand.slug,
    sensorFormat: camera.sensorFormat,
    limit: 3,
  });

  const detailData = mapContentfulCameraToDetail(camera, relatedCameras);

  return <CameraDetailView camera={detailData} />;
}