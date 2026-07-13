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
  Smartphone,
  Gauge,
  Grid3x3,
} from "lucide-react";

type Props = {
  camera: CameraDetailData;
};

// Ikony dla poszczególnych pól - bardziej rozszerzone mapowanie
const getFieldIcon = (
  label: string
): React.ComponentType<{ className: string }> | null => {
  const lowerLabel = label.toLowerCase();

  const iconMap: Record<string, React.ComponentType<{ className: string }>> = {
    iso: Zap,
    sensor: Grid3x3,
    resolution: ImageIcon,
    battery: Battery,
    video: Video,
    wifi: Wifi,
    connectivity: Wifi,
    display: Monitor,
    screen: Monitor,
    weight: Gauge,
    dimensions: Camera,
    focus: Focus,
    autofocus: Focus,
    lens: Camera,
    zoom: Camera,
    megapixel: ImageIcon,
    megapixels: ImageIcon,
    flash: Zap,
    exposure: Zap,
  };

  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerLabel.includes(key)) {
      return icon;
    }
  }
  return null;
};

function formatValue(value: string | number): {
  text: string;
  isEmpty: boolean;
} {
  const strValue = String(value);
  const isEmpty =
    strValue === "Brak danych" || strValue === "No data" || strValue === "-";
  return { text: strValue, isEmpty };
}

export function CameraSpecs({ camera }: Props) {
  // Fields to exclude from display
  const excludedFields = ["country", "founded", "gps", "year founded"];

  // Flatten all specs from all groups into a single array
  const allSpecs = camera.specs.flatMap((group) =>
    group.items.map((item) => ({
      label: item.label,
      value: item.value,
    }))
  );

  // Filter out empty specs and excluded fields
  const filledSpecs = allSpecs.filter((spec) => {
    const { text } = formatValue(spec.value);
    const isExcluded = excludedFields.some((field) =>
      spec.label.toLowerCase().includes(field.toLowerCase())
    );
    return text !== "Brak danych" && !isExcluded;
  });

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
          All technical specifications of this camera, carefully organized for
          easy comparison and understanding.
        </p>
      </div>

      {/* Unified specs grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {filledSpecs.map((spec, index) => {
          const { text, isEmpty } = formatValue(spec.value);
          const FieldIcon = getFieldIcon(spec.label);

          return (
            <div
              key={`${spec.label}-${index}`}
              className="group/spec overflow-hidden rounded-[14px] border border-[var(--border-light)] bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg-darker)] p-4 transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 hover:bg-gradient-to-br hover:from-[var(--bg-dark)]/80 hover:to-[var(--bg-darker)]/80 sm:rounded-[16px] sm:p-5"
              style={{
                animationDelay: `${index * 20}ms`,
              }}
            >
              {/* Icon section */}
              {FieldIcon && (
                <div className="mb-3 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 transition-all duration-300 group-hover/spec:scale-110 group-hover/spec:bg-[var(--accent-primary)]/20">
                    <FieldIcon className="h-5 w-5 text-[var(--accent-primary)]/70 transition-colors duration-300 group-hover/spec:text-[var(--accent-primary)]" />
                  </div>
                </div>
              )}

              {/* Label */}
              <label className="mb-2 block text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] transition-colors duration-300 group-hover/spec:text-[var(--accent-primary)]/80 sm:text-[10px]">
                {spec.label}
              </label>

              {/* Value */}
              <div
                className={`text-center text-sm font-medium leading-5 transition-colors duration-300 sm:text-[15px] sm:leading-6 ${
                  isEmpty
                    ? "text-[var(--text-muted)] italic opacity-60"
                    : "text-[var(--text-primary)] group-hover/spec:text-[var(--accent-primary)]"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}