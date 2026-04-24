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
      className="space-y-8 rounded-[28px] border border-[var(--border-light)] bg-[var(--bg-card)] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
          Podobne aparaty
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {camera.related.map((related) => (
          <Link
            key={related.id}
            href={`/cameras/${related.slug}`}
            className="group overflow-hidden rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-darker)] transition hover:border-[var(--accent-primary)]"
          >
            <div className="relative aspect-[4/3] bg-[var(--bg-darker)]">
              {related.image ? (
                <Image
                  src={related.image}
                  alt={related.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
                  Brak zdjęcia
                </div>
              )}
            </div>

            <div className="space-y-3 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                {related.brand}
              </p>

              <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                {related.name}
              </h3>

              <p className="text-sm text-[var(--text-secondary)]">
                {related.releaseYear ?? "—"} • {related.sensorFormat ?? "—"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}