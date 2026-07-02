import { CameraDetailData } from "./types";
import {
  DollarSign,
  Camera,
  Focus,
  Image as ImageIcon,
  Video,
  Wifi,
  Settings,
} from "lucide-react";

type Props = {
  camera: CameraDetailData;
};

const sectionIcons: Record<string, React.ComponentType<{ className: string }>> = {
  "Price": DollarSign,
  "Body": Camera,
  "Optics": Focus,
  "Image": ImageIcon,
  "Video": Video,
  "Display & Connectivity": Wifi,
  "Miscellaneous": Settings,
};

export function CameraSpecs({ camera }: Props) {
  return (
    <section
      id="specs"
      className="scroll-mt-24 space-y-8 rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-6 sm:rounded-[28px] sm:px-5 sm:py-8 md:px-8 md:py-10 xl:rounded-[32px] xl:px-10 xl:py-12"
    >
      <div className="text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] sm:text-[11px] sm:tracking-[0.35em]">
          Engineering overview
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl xl:text-5xl">
          Specyfikacja
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
          Zebrane najważniejsze informacje techniczne pogrupowane w logiczne
          sekcje, tak aby łatwiej porównywać modele i budować bardziej premium
          doświadczenie katalogowe.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {camera.specs.map((group, index) => (
          <div
            key={group.title}
            className="group overflow-hidden rounded-[18px] border border-[var(--border-light)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg-darker)] p-5 transition duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 sm:rounded-[22px] sm:p-6"
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
          >
            <div className="mb-6 space-y-3 border-b border-[var(--border-light)] pb-4">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon = sectionIcons[group.title];
                  return Icon ? (
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 text-[var(--accent-primary)]" />
                  ) : null;
                })()}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
                    {group.items.length} parametr{group.items.length !== 1 ? "ów" : "u"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {group.items.map((item, itemIndex) => (
                <div
                  key={item.label}
                  className="group/item border-l-2 border-[var(--border-light)] pl-3 transition-all duration-200 hover:border-[var(--accent-primary)]/50"
                >
                  <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover/item:text-[var(--accent-primary)]/70 sm:text-[10px] sm:tracking-[0.35em]">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium leading-5 text-[var(--text-primary)] group-hover/item:text-[var(--accent-primary)] sm:text-[15px] sm:leading-6">
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