import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraSpecs({ camera }: Props) {
  return (
    <section
      id="specs"
      className="scroll-mt-24 space-y-8 rounded-[24px] border border-[#1f1914] bg-[linear-gradient(180deg,#080808_0%,#060606_100%)] px-4 py-6 sm:rounded-[28px] sm:px-5 sm:py-8 md:px-8 md:py-10 xl:rounded-[32px] xl:px-10 xl:py-12"
    >
      <div className="text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#a07f5e] sm:text-[11px] sm:tracking-[0.35em]">
          Engineering overview
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-[#f6efe7] sm:text-3xl md:text-4xl xl:text-5xl">
          Pełna Specyfikacja Techniczna
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[#aa9f93] sm:text-base sm:leading-7">
          Zebrane najważniejsze informacje techniczne pogrupowane w logiczne
          sekcje, tak aby łatwiej porównywać modele i budować bardziej premium
          doświadczenie katalogowe.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2 xl:gap-8">
        {camera.specs.map((group, index) => (
          <div
            key={group.title}
            className="rounded-[22px] border border-[#241d17] bg-[linear-gradient(180deg,#0d0d0d_0%,#090909_100%)] p-4 transition duration-300 hover:-translate-y-[2px] hover:border-[#3a2d21] hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:rounded-[26px] sm:p-5 md:p-6"
            style={{
              transitionDelay: `${index * 40}ms`,
            }}
          >
            <div className="mb-5 flex items-center gap-3 border-b border-[#32271d] pb-4 sm:gap-4">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#47321f] bg-[#1a140f] text-xs text-[#d2a36b] sm:h-8 sm:w-8 sm:text-sm">
                •
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#f6efe7] sm:text-2xl">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs text-[#8f8174] sm:text-sm">
                  Sekcja parametrów technicznych
                </p>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
              {group.items.map((item) => (
                <div key={item.label} className="border-b border-[#181512] pb-4">
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#766657] sm:tracking-[0.28em]">
                    {item.label}
                  </div>
                  <div className="text-sm leading-6 text-[#f1e8dc] sm:text-[15px] sm:leading-7 md:text-base">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}