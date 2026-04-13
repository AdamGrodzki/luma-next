import Image from "next/image";
import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraHero({ camera }: Props) {
  const watermark = camera.name.split(" ").slice(0, 2).join(" ");

  return (
    <section
      id="hero"
      className="scroll-mt-24 relative overflow-hidden rounded-[24px] border border-[var(--border-light)] bg-[linear-gradient(180deg,var(--bg-dark)_0%,var(--bg-darker)_100%)] px-4 py-5 sm:rounded-[28px] sm:px-5 sm:py-6 md:px-8 md:py-8 xl:rounded-[36px] xl:px-12 xl:py-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[-20%] h-[180px] w-[180px] rounded-full bg-[var(--accent-primary)]/10 blur-3xl sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px]" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[160px] w-[160px] rounded-full bg-white/[0.03] blur-3xl sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
        <div className="absolute right-[-8px] top-4 text-[52px] font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[80px] md:text-[120px] xl:right-[-20px] xl:top-6 xl:text-[220px]">
          {watermark}
        </div>
      </div>

      <div className="relative grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-center xl:gap-10">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {camera.brand.logo ? (
                <div className="inline-flex rounded-xl border border-[var(--border-light)] bg-white/95 p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:p-3">
                  <Image
                    src={camera.brand.logo}
                    alt={camera.brand.name}
                    width={110}
                    height={44}
                    className="h-auto w-auto max-w-[90px] object-contain sm:max-w-[110px]"
                  />
                </div>
              ) : null}

              <div className="inline-flex rounded-full border border-[var(--special-badge-border)] bg-[var(--special-brand-bg)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-secondary)] sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.28em]">
                {camera.brand.name}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.38em]">
                Kolekcja aparatów / detal modelu
              </p>

              <h1 className="max-w-[12ch] text-3xl font-black uppercase leading-[0.95] text-[var(--text-primary)] sm:text-4xl md:text-5xl xl:max-w-[10ch] xl:text-7xl">
                {camera.name}
              </h1>

              {camera.subtitle ? (
                <p className="max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7 md:text-lg">
                  {camera.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {camera.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-[18px] border border-[var(--border-light)] bg-[linear-gradient(180deg,var(--bg-dark)_0%,var(--bg-dark)_100%)] p-4 transition duration-300 hover:-translate-y-[2px] hover:border-[var(--border-light)] hover:bg-[var(--bg-dark)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.22)] sm:rounded-[22px] sm:p-5"
              >
                <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] sm:mb-3 sm:tracking-[0.28em]">
                  {stat.label}
                </div>
                <div className="text-lg font-semibold leading-tight text-[var(--text-primary)] sm:text-xl md:text-2xl">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center xl:justify-end">
          <div className="relative w-full max-w-[620px]">
            <div className="absolute inset-0 rounded-[24px] bg-[var(--accent-primary)]/10 blur-2xl sm:rounded-[30px]" />

            <div className="relative rounded-[24px] border border-[var(--border-light)] bg-[linear-gradient(180deg,var(--bg-dark)_0%,var(--bg-dark)_100%)] p-3 shadow-[0_25px_100px_rgba(0,0,0,0.45)] sm:rounded-[30px] sm:p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] sm:tracking-[0.28em]">
                  Hero image
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] sm:tracking-[0.28em]">
                  {camera.brand.name}
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-[var(--border-light)] bg-[var(--bg-dark)] sm:rounded-[22px]">
                {camera.image ? (
                  <>
                    <Image
                      src={camera.image}
                      alt={camera.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_35%,transparent_65%,rgba(0,0,0,0.12))]" />
                  </>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
                    Brak zdjęcia
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}