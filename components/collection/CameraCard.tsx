import Link from "next/link";
import Image from "next/image";
import { buildContentfulImageUrl } from "@/src/lib/contentful/assets";
import type { CollectionCameraCard } from "./types";

type Props = {
  camera: CollectionCameraCard & {
    imageUrl?: string | null;
  };
};

export default function CameraCard({ camera }: Props) {
  const thumb = camera.imageUrl
    ? buildContentfulImageUrl(camera.imageUrl, { w: 800, h: 520, fit: "fill" })
    : null;

  return (
    <Link
      href={`/cameras/${camera.slug}`}
      className="overflow-hidden rounded-2xl border border-[#1d1711] bg-[#090b0c] transition hover:border-[#4a3827]"
    >
      <div className="aspect-[4/3] bg-[#0d1012]">
        {thumb ? (
          <Image
            src={thumb}
            alt={camera.name}
            width={800}
            height={520}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.16em] text-[#7d756b]">
            Brak zdjęcia
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs uppercase tracking-[0.14em] text-[#b4916c]">
          {camera.type || "Aparat"}
        </div>
        <h4 className="mt-2 text-lg font-semibold text-[#f2e9de]">
          {camera.name}
        </h4>
        <div className="mt-3 flex items-center justify-between text-sm text-[#a9a097]">
          <span>Premiera</span>
          <span>{camera.year || "—"}</span>
        </div>
      </div>
    </Link>
  );
}