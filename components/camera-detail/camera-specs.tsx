import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraSpecs({ camera }: Props) {
  return (
    <section 
        id="specs"
        className="space-y-10 rounded-[32px] border border-[#1f1914] bg-[linear-gradient(180deg,#080808_0%,#060606_100%)] px-6 py-10 md:px-10 md:py-12">
    
      <div className="text-center">
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#a07f5e]">
          Engineering overview
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-[#f6efe7] md:text-5xl">
          Pełna Specyfikacja Techniczna
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#aa9f93] md:text-base">
          Zebrane najważniejsze informacje techniczne pogrupowane w logiczne
          sekcje, tak aby łatwiej porównywać modele i budować bardziej premium
          doświadczenie katalogowe.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {camera.specs.map((group) => (
          <div
            key={group.title}
            className="rounded-[26px] border border-[#241d17] bg-[linear-gradient(180deg,#0d0d0d_0%,#090909_100%)] p-6 md:p-7"
          >
            <div className="mb-6 flex items-center gap-4 border-b border-[#32271d] pb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#47321f] bg-[#1a140f] text-sm text-[#d2a36b]">
                •
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#f6efe7]">
                  {group.title}
                </h3>
                <p className="mt-1 text-sm text-[#8f8174]">
                  Sekcja parametrów technicznych
                </p>
              </div>
            </div>

            <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-[#181512] pb-4 last:border-b-[#181512]"
                >
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#766657]">
                    {item.label}
                  </div>
                  <div className="text-[15px] leading-7 text-[#f1e8dc] md:text-base">
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