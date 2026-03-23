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
  className="relative overflow-hidden rounded-[36px] border border-[#2a2119] bg-[linear-gradient(180deg,#0b0b0b_0%,#070707_100%)] px-6 py-8 md:px-10 md:py-10 xl:px-12 xl:py-12"
>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[#a7753f]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[260px] w-[260px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.045]">
        <div className="absolute right-[-20px] top-6 text-[90px] font-black uppercase leading-none tracking-[-0.04em] text-white md:text-[150px] xl:text-[220px]">
          {watermark}
        </div>
      </div>

      <div className="relative grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              {camera.brand.logo ? (
                <div className="inline-flex rounded-xl border border-[#2c241d] bg-white/95 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                  <Image
                    src={camera.brand.logo}
                    alt={camera.brand.name}
                    width={120}
                    height={48}
                    className="h-auto w-auto object-contain"
                  />
                </div>
              ) : null}

              <div className="inline-flex rounded-full border border-[#3b2d20] bg-[#110e0b] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d0a46f]">
                {camera.brand.name}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.38em] text-[#9f8364]">
                Kolekcja aparatów / detal modelu
              </p>

              <h1 className="max-w-[10ch] text-4xl font-black uppercase leading-[0.92] text-[#f7f1e8] sm:text-5xl md:text-6xl xl:text-7xl">
                {camera.name}
              </h1>

              {camera.subtitle ? (
                <p className="max-w-2xl text-base leading-7 text-[#c5b8aa] md:text-lg">
                  {camera.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {camera.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-[22px] border border-[#221b15] bg-[linear-gradient(180deg,#101010_0%,#0b0b0b_100%)] p-5 transition duration-300 hover:border-[#3e2f22] hover:bg-[#101010]"
              >
                <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#806d5b]">
                  {stat.label}
                </div>
                <div className="text-xl font-semibold leading-tight text-[#f6efe7] sm:text-2xl">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center xl:justify-end">
          <div className="relative w-full max-w-[620px]">
            <div className="absolute inset-0 rounded-[30px] bg-[#b07a43]/10 blur-2xl" />

            <div className="relative rounded-[30px] border border-[#31261d] bg-[linear-gradient(180deg,#111111_0%,#0c0c0c_100%)] p-4 shadow-[0_25px_100px_rgba(0,0,0,0.45)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#806d5b]">
                  Hero image
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#806d5b]">
                  {camera.brand.name}
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[#3a2d21] bg-[#0b0b0b]">
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
                  <div className="flex h-full items-center justify-center text-sm text-[#8b7b6c]">
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