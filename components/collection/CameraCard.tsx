import Link from "next/link";
import Image from "next/image";
import { buildContentfulImageUrl } from "@/src/lib/contentful/assets";
import { CAMERA_CARD_CLASSES } from "@/src/utils/tailwind-classes";
import type { CollectionCameraCard } from "./types";

type Props = {
  camera: CollectionCameraCard & {
    imageUrl?: string | null;
  };
  priority?: boolean;
};

export default function CameraCard({ camera, priority = false }: Props) {
  const thumb = camera.imageUrl
    ? buildContentfulImageUrl(camera.imageUrl, { w: 800, h: 520, fit: "fill" })
    : null;

  return (
    <Link
      href={`/cameras/${camera.slug}`}
      className={CAMERA_CARD_CLASSES.CONTAINER}
    >
      <div className={CAMERA_CARD_CLASSES.IMAGE_CONTAINER}>
        {thumb ? (
          <Image
            src={thumb}
            alt={camera.name}
            width={800}
            height={520}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            className={CAMERA_CARD_CLASSES.IMAGE}
          />
        ) : (
          <div className={CAMERA_CARD_CLASSES.PLACEHOLDER_TEXT}>
            No image available
          </div>
        )}
      </div>

      <div className={CAMERA_CARD_CLASSES.CONTENT}>
        {camera.brandName && (
          <div className={CAMERA_CARD_CLASSES.BRAND_NAME}>
            {camera.brandName}
          </div>
        )}
        <div className={CAMERA_CARD_CLASSES.TYPE_BADGE}>
          {camera.type || "Camera"}
        </div>
        <h4 className={CAMERA_CARD_CLASSES.TITLE}>
          {camera.name}
        </h4>
        <div className={CAMERA_CARD_CLASSES.FOOTER}>
          <span>Premiere</span>
          <span>{camera.year || "—"}</span>
        </div>
      </div>
    </Link>
  );
}