import type { CameraDetailData } from "@/components/camera-detail/types";
import type { Camera } from "@/src/types/contentful";

export function mapContentfulCameraToDetail(
  camera: Camera,
  relatedCameras: Camera[] = []
): CameraDetailData {
  const marketAvg = camera.marketPriceAvg ?? 3300;
  const marketMin = camera.marketPriceMin ?? 3000;
  const marketMax = camera.marketPriceMax ?? 3600;

  return {
    slug: camera.slug,
    brand: {
      name: camera.brand.name,
      logo: camera.brand.logoUrl ?? null,
    },
    name: camera.name,
    subtitle: camera.shortDescription ?? camera.description ?? null,
    image: camera.heroImageUrl ?? null,
    gallery: camera.galleryUrls ?? [],
    description: camera.description ?? null,
    story: camera.story ?? camera.description ?? null,

    heroStats: [
      {
        label: "Premiere",
        value: camera.releaseYear ? String(camera.releaseYear) : "No data",
      },
      {
        label: "Sensor",
        value: camera.sensorSize ?? "No data",
      },
      {
        label: "Type",
        value: camera.bodyType ?? "No data",
      },
      {
        label: "Mount",
        value: camera.lensMount ?? "No data",
      },
    ],

    popularity: {
      label: camera.popularityLabel ?? "Standardowy",
      score: camera.popularityScore ?? 37,
      updatedAt: "Aktualne dane katalogowe",
      summary:
        (camera.popularityScore ?? 0) >= 70
          ? "Model o wysokiej rozpoznawalności i silnej obecności w katalogu."
          : "Model o stabilnej obecności i standardowej rozpoznawalności.",
      recommendedLenses:
        camera.recommendedLenses?.length
          ? camera.recommendedLenses
          : camera.brand.name === "Canon"
          ? [
              "Canon RF 24-70mm f/2.8L IS USM",
              "Canon RF 50mm f/1.8 STM",
              "Canon RF 70-200mm f/4L IS USM",
            ]
          : ["Uniwersalny zoom 24-70", "Jasna 50 mm", "Telezoom 70-200"],
      regions: [
        { name: "Polska", value: 42 },
        { name: "Niemcy", value: 51 },
        { name: "Japonia", value: 58 },
        { name: "USA", value: 47 },
      ],
    },

    marketValue: {
      average: marketAvg,
      currency: "PLN",
      min: marketMin,
      max: marketMax,
      history: [
        { label: "Q1", value: marketMin },
        { label: "Q2", value: Math.round((marketMin + marketAvg) / 2) },
        { label: "Q3", value: marketAvg },
        { label: "Q4", value: marketMax },
      ],
    },

    specs: [
      {
        title: "Body",
        items: [
          { label: "Type", value: camera.bodyType ?? "No data" },
          {
            label: "Weight",
            value: camera.WeightIncBatteries ? `${camera.WeightIncBatteries} g` : "No data",
          },
          { label: "Dimensions", value: camera.dimensions ?? "No data" },
          { label: "Lens Mount", value: camera.lensMount ?? "No data" },
        ],
      },
      {
        title: "Viewfinder",
        items: [
          { label: "Viewfinder Type", value: camera.viewfinderType ?? "No data" },
          {
            label: "Viewfinder Coverage",
            value: camera.viewfinderCoverage ?? "No data",
          },
          {
            label: "Viewfinder Magnification",
            value: camera.viewFinderMagnification ?? "No data",
          },
          {
            label: "Viewfinder Resolution",
            value: camera.viewFinderResolution
              ? `${camera.viewFinderResolution}`
              : "No data",
          },
        ],
      },
      {
        title: "Display & Controls",
        items: [
          { label: "LCD Screen", value: camera.articulatedLcd ?? "No data" },
          {
            label: "Continuous Shooting",
            value: camera.continuousDrive ?? "No data",
          },
          {
            label: "Touchscreen",
            value:
              camera.touchscreen == null
                ? "No data"
                : camera.touchscreen
                ? "Yes"
                : "No",
          },
          {
            label: "Live view",
            value:
              camera.liveView == null ? "No data" : camera.liveView ? "Yes" : "No",
          },
        ],
      },
      {
        title: "Sensor & Focus",
        items: [
          { label: "Sensor Size", value: camera.sensorSize ?? "No data" },
          { label: "Sensor Type", value: camera.sensorType ?? "No data" },
          {
            label: "Effective Pixels",
            value: camera.effectivePixels
              ? `${camera.effectivePixels} Mpx`
              : "No data",
          },
          {
            label: "Focus Points",
            value: camera.numberOfFocusPoints ?? "No data",
          },
          {
            label: "Autofocus",
            value: camera.autofocus ?? "No data",
          },

        ],
      },
      {
        title: "Image Processing",
        items: [
          {
            label: "Image Stabilization",
            value: camera.imageStabilization ?? "No data",
          },
          { label: "ISO Range", value: camera.ISO ?? "No data" },
          {
            label: "Boosted ISO",
            value: camera.isoBoostMin && camera.isoBoostMax
              ? `${camera.isoBoostMin} - ${camera.isoBoostMax}`
              : "No data",
          },

          { label: "File Formats", value: camera.fileFormat ?? "No data" },
          { label: "Image Ratio", value: camera.ImageRatioWh ?? "No data" },
        ],
      },
      {
        title: "Exposure",
        items: [
          {
            label: "Maximum Shutter Speed",
            value: camera.maximumShutterSpeed ?? "No data",
          },
          {
            label: "Minimum Shutter Speed",
            value: camera.minimumShutterSpeed ?? "No data",
          },
          {
            label: "Exposure Compensation",
            value: camera.exposureCompensation ?? "No data",
          },
        ],
      },
      {
        title: "Video",
        items: [
          {
            label: "Microphone Port",
            value:
              camera.microphonePort == null ? "No data" : camera.microphonePort ? "Yes" : "No",
          },
        ],
      },
      {
        title: "Connectivity",
        items: [
          { label: "USB Version", value: camera.USB ?? "No data" },
          {
            label: "USB Charging",
            value:
              camera.usbCharging == null
                ? "No data"
                : camera.usbCharging
                ? "Yes"
                : "No",
          },
          {
            label: "GPS",
            value: camera.GPS == null ? "No data" : camera.GPS ? "Yes" : "No",
          },
        ],
      },
      {
        title: "Power & Misc",
        items: [
          {
            label: "Built-in Flash",
            value:
              camera.builtInFlash == null
                ? "No data"
                : camera.builtInFlash
                ? "Yes"
                : "No",
          },
          {
            label: "Self Timer",
            value:
              camera.selfTimer == null
                ? "No data"
                : camera.selfTimer
                ? "Yes"
                : "No",
          },
          {
            label: "Battery Description",
            value: camera.batteryDescription ?? "No data",
          },
          {
            label: "Battery Life (CIPA)",
            value: camera.batteryLifeCIPA ?? "No data",
          },
          {
            label: "Brand Country",
            value: camera.brand.country ?? "No data",
          },
          {
            label: "Brand Founded Year",
            value: camera.brand.foundedYear
              ? String(camera.brand.foundedYear)
              : "No data",
          },
        ],
      },
    ],

    related: relatedCameras.map((related) => ({
      id: related.id,
      slug: related.slug,
      name: related.name,
      image: related.heroImageUrl ?? null,
      releaseYear: related.releaseYear ?? null,
      sensorSize: related.sensorSize ?? null,
      brand: related.brand.name ?? "No data",
    })),
  };
}
