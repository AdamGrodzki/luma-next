import Link from "next/link";
import Image from "next/image";
import { buildContentfulImageUrl } from "@/src/lib/contentful/assets";
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
      className="overflow-hidden rounded-lg sm:rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] transition hover:border-[var(--accent-primary)]"
    >
      <div className="aspect-[4/3] bg-[var(--bg-darker)]">
        {thumb ? (
          <Image
            src={thumb}
            alt={camera.name}
            width={800}
            height={520}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-[#7d756b]">
            Brak zdjęcia
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 bg-[var(--special-brand-bg)]">
        <div className="text-xs uppercase tracking-[0.14em] rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors text-[var(--accent-primary)]">
          {camera.type || "Aparat"}
        </div>
        <h4 className="mt-1.5 sm:mt-2 text-base sm:text-lg font-semibold text-[var(--text-primary)] line-clamp-2">
          {camera.name}
        </h4>
        <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)]">
          <span>Premiera</span>
          <span>{camera.year || "—"}</span>
        </div>
      </div>
    </Link>
  );
}