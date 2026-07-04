import { CameraDetailData } from "./types";
import {
  Camera,
  Focus,
  Image as ImageIcon,
  Video,
  Wifi,
  Zap,
  Monitor,
  Battery,
} from "lucide-react";

type Props = {
  camera: CameraDetailData;
};

const sectionIcons: Record<string, React.ComponentType<{ className: string }>> = {
  Body: Camera,
  Viewfinder: Focus,
  "Display & Controls": Monitor,
  "Sensor & Focus": Focus,
  "Image Processing": ImageIcon,
  Exposure: Zap,
  Video: Video,
  Connectivity: Wifi,
  "Power & Misc": Battery,
};

// Ikony dla poszczególnych pól
const fieldIcons: Record<string, React.ComponentType<{ className: string }>> = {
  ISO: Zap,
  "Procesor obrazu": Zap,
  Ekran: Monitor,
  Bateria: Battery,
};

function formatValue(value: string | number): {
  text: string;
  isEmpty: boolean;
} {
  const strValue = String(value);
  const isEmpty = strValue === "Brak danych";
  return { text: strValue, isEmpty };
}

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
          Full technical specifications
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base sm:leading-7">
          The full technical specifications of the camera, grouped into logical
          categories for comparison with other models.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
        {camera.specs.map((group, groupIndex) => {
          const Icon = sectionIcons[group.title];
          const filledItemsCount = group.items.filter(
            (item) => item.value !== "No data"
          ).length;

          return (
            <div
              key={group.title}
              className="group overflow-hidden rounded-[18px] border border-[var(--border-light)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg-darker)] transition duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 sm:rounded-[22px]"
              style={{
                transitionDelay: `${groupIndex * 30}ms`,
              }}
            >
              {/* Section header */}
              <div className="border-b border-[var(--border-light)] bg-gradient-to-r from-[var(--accent-primary)]/5 to-transparent p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--accent-primary)]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
                      {filledItemsCount} of {group.items.length} available
                    </p>
                  </div>
                </div>
              </div>

              {/* Spec items */}
              <div className="divide-y divide-[var(--border-light)] p-5 sm:p-6">
                {group.items.map((item) => {
                  const { text, isEmpty } = formatValue(item.value);
                  const FieldIcon = Object.entries(fieldIcons).find(([key]) =>
                    item.label.toLowerCase().includes(key.toLowerCase())
                  )?.[1];

                  return (
                    <div
                      key={item.label}
                      className={`group/item py-3.5 first:pt-0 last:pb-0 transition-colors ${
                        isEmpty ? "opacity-60" : ""
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        {FieldIcon && (
                          <FieldIcon className="h-4 w-4 text-[var(--accent-primary)]/60" />
                        )}
                        <label className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover/item:text-[var(--accent-primary)]/70 sm:text-[10px] sm:tracking-[0.35em]">
                          {item.label}
                        </label>
                      </div>
                      <div
                        className={`text-sm font-medium leading-5 sm:text-[15px] sm:leading-6 ${
                          isEmpty
                            ? "text-[var(--text-muted)] italic"
                            : "text-[var(--text-primary)] group-hover/item:text-[var(--accent-primary)]"
                        }`}
                      >
                        {text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}