import Link from "next/link";
import type { CollectionCameraCard } from "./types";

type Props = {
  camera: CollectionCameraCard;
};

export default function CameraCard({ camera }: Props) {
  return (
    <Link
      href={`/cameras/${camera.slug}`}
      className="rounded-2xl border border-[#1d1711] bg-[#090b0c] p-4 transition hover:border-[#4a3827]"
    >
      <div className="text-xs uppercase tracking-[0.14em] text-[#b4916c]">
        {camera.type || "Aparat"}
      </div>
      <h4 className="mt-2 text-lg font-semibold text-[#f2e9de]">{camera.name}</h4>
      <div className="mt-3 flex items-center justify-between text-sm text-[#a9a097]">
        <span>Premiera</span>
        <span>{camera.year || "—"}</span>
      </div>
    </Link>
  );
}