import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraPopularity({ camera }: Props) {
  const popularity = camera.popularity;

  return (
    <section  id="popularity"
  className="space-y-8 rounded-[28px] border border-[#1d1a17] bg-[#070707] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#f6efe7] md:text-5xl">
          Analiza Popularności
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#b8966e]">
          System rzadkości i aktywność regionalna
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[24px] border border-[#2b241d] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%),_#111111] p-7">
          <div className="mb-6 inline-flex rounded-md bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black">
            {popularity.label}
          </div>

          <p className="mb-6 text-center italic leading-7 text-[#cbbcab]">
            {popularity.summary}
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-[#2f261e] pt-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#7d6c5c]">
                Siła trendu
              </div>
              <div className="mt-2 text-4xl font-black text-[#f6efe7]">
                {popularity.score}/100
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#7d6c5c]">
                Nast. aktualizacja
              </div>
              <div className="mt-2 text-2xl font-semibold text-[#f6efe7]">
                {popularity.updatedAt}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#2b241d] bg-[#0d0d0d] p-7">
          <h3 className="mb-5 text-2xl font-bold text-[#f6efe7]">
            Rekomendowane Obiektywy ({camera.brand.name})
          </h3>

          <div className="space-y-3">
            {popularity.recommendedLenses.map((lens) => (
              <div
                key={lens}
                className="rounded-xl border border-[#221d18] bg-[#090909] px-4 py-3 text-[#d4c6b8]"
              >
                {lens}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#2b241d] bg-[#0d0d0d] p-7">
        <h3 className="mb-6 text-center text-2xl font-bold text-[#f6efe7]">
          Aktywność Globalna (Dane regionalne)
        </h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularity.regions.map((region) => (
            <div
              key={region.name}
              className="rounded-xl border border-[#1f1a15] bg-[#090909] p-4"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-[#8f7a67]">
                {region.name}
              </div>
              <div className="mt-3 text-3xl font-bold text-[#f6efe7]">
                {region.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}