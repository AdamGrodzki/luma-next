import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraPopularity({ camera }: Props) {
  const popularity = camera.popularity;

  return (
    <section  id="popularity"
      className="space-y-8 rounded-[28px] border border-[var(--border-light)] bg-[var(--bg-darker)] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
          Analiza Popularności
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
          System rzadkości i aktywność regionalna
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-dark)] p-7">
          <div className="mb-6 inline-flex rounded-md px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black bg-[var(--accent-primary)]">
            {popularity.label}
          </div>

          <p className="mb-6 text-center italic leading-7 text-[var(--text-muted)]">
            {popularity.summary}
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-[var(--border-light)] pt-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                Siła trendu
              </div>
              <div className="mt-2 text-4xl font-black text-[var(--text-primary)]">
                {popularity.score}/100
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                Nast. aktualizacja
              </div>
              <div className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                {popularity.updatedAt}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-dark)] p-7">
          <h3 className="mb-5 text-2xl font-bold text-[var(--text-primary)]">
            Rekomendowane Obiektywy ({camera.brand.name})
          </h3>

          <div className="space-y-3">
            {popularity.recommendedLenses.map((lens) => (
              <div
                key={lens}
                className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-dark)] px-4 py-3 text-[var(--text-muted)]"
              >
                {lens}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-dark)] p-7">
        <h3 className="mb-6 text-center text-2xl font-bold text-[var(--text-primary)]">
          Aktywność Globalna (Dane regionalne)
        </h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularity.regions.map((region) => (
            <div
              key={region.name}
              className="rounded-xl border border-[var(--border-light)] bg-[var(--bg-dark)] p-4"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {region.name}
              </div>
              <div className="mt-3 text-3xl font-bold text-[var(--text-primary)]">
                {region.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}