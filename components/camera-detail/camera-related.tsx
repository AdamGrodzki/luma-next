import Link from "next/link";
import Image from "next/image";
import type { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraRelated({ camera }: Props) {
  if (!camera.related.length) return null;

  return (
    <section 
        id="related"
        className="space-y-8 rounded-[28px] border border-[#1d1a17] bg-[#070707] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#f6efe7] md:text-5xl">
          Podobne aparaty
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {camera.related.map((related) => (
          <Link
            key={related.id}
            href={`/cameras/${related.slug}`}
            className="group overflow-hidden rounded-[22px] border border-[#221b15] bg-[#0b0b0b] transition hover:border-[#3a2d21]"
          >
            <div className="relative aspect-[4/3] bg-[#090909]">
              {related.image ? (
                <Image
                  src={related.image}
                  alt={related.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#8b7b6c]">
                  Brak zdjęcia
                </div>
              )}
            </div>

            <div className="space-y-3 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[#a88a69]">
                {related.brand}
              </p>

              <h3 className="text-2xl font-semibold text-[#f6efe7]">
                {related.name}
              </h3>

              <p className="text-sm text-[#b9aa9a]">
                {related.releaseYear ?? "—"} • {related.sensorFormat ?? "—"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}