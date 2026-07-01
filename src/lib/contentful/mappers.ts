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
    msrp: camera.msrp ?? null,

    heroStats: [
      {
        label: "Premiera",
        value: camera.releaseYear ? String(camera.releaseYear) : "Brak danych",
      },
      {
        label: "Matryca",
        value: camera.sensorFormat ?? "Brak danych",
      },
      {
        label: "Typ",
        value: camera.cameraType ?? "Brak danych",
      },
      {
        label: "Mocowanie",
        value: camera.mount ?? "Brak danych",
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
        title: "Price",
        items: [
          {
            label: "Sugerowana cena detaliczna producenta",
            value: camera.msrp ?? "Brak danych",
          },
        ],
      },
      {
        title: "Body",
        items: [
          { label: "Typ obudowy", value: camera.bodyType ?? "Brak danych" },
          {
            label: "Waga",
            value: camera.weight ? `${camera.weight} g` : "Brak danych",
          },
          { label: "Wymiary", value: camera.dimensions ?? "Brak danych" },
          { label: "Mocowanie obiektyvu", value: camera.mount ?? "Brak danych" },
          { label: "Ekran LCD", value: camera.articulatedLcd ?? "Brak danych" },
          {
            label: "Zdjęcia seryjne",
            value: camera.continuousShooting ?? "Brak danych",
          },
          { label: "Typ wizjera", value: camera.viewfinderType ?? "Brak danych" },
          {
            label: "Pokrycie wizjera",
            value: camera.viewfinderCoverage ?? "Brak danych",
          },
          {
            label: "Powiększenie wizjera",
            value: camera.viewfinderMagnification ?? "Brak danych",
          },
          {
            label: "Rozdzielczość wizjera",
            value: camera.viewfinderResolution
              ? `${camera.viewfinderResolution.toLocaleString('pl-PL')}`
              : "Brak danych",
          },
        ],
      },
      {
        title: "Optics",
        items: [
          { label: "Rozmiar sensora", value: camera.sensorFormat ?? "Brak danych" },
          { label: "Typ sensora", value: camera.sensorType ?? "Brak danych" },
          {
            label: "Stabilizacja obrazu",
            value: camera.imageStabilization ?? "Brak danych",
          },
          {
            label: "Maks. rozdzielczość",
            value: camera.maxResolution ?? "Brak danych",
          },
          {
            label: "Efektywne piksele",
            value: camera.effectivePixels
              ? `${camera.effectivePixels} megapikseli`
              : "Brak danych",
          },
          {
            label: "Procesor obrazu",
            value: camera.imageProcessor ?? "Brak danych",
          },
          {
            label: "Punkty ostrości",
            value: camera.numberFocusPoints ?? "Brak danych",
          },
          {
            label: "Ostrość ręczna",
            value:
              camera.manualFocus == null
                ? "Brak danych"
                : camera.manualFocus
                ? "Tak"
                : "Nie",
          },
          { label: "Autofocus", value: camera.autofocus == null ? "Brak danych" : camera.autofocus ? "Tak" : "Nie" },
        ],
      },
      {
        title: "Image",
        items: [
          { label: "Zakres ISO", value: camera.isoRange ?? "Brak danych" },
          {
            label: "ISO wzmocnione (min)",
            value: camera.isoBoostMin ?? "Brak danych",
          },
          {
            label: "ISO wzmocnione (max)",
            value: camera.isoBoostMax ?? "Brak danych",
          },
          {
            label: "Presety balansu bieli",
            value: camera.whiteBalancePresets ?? "Brak danych",
          },
          {
            label: "Niestandardowy balans bieli",
            value:
              camera.customWhiteBalance == null
                ? "Brak danych"
                : camera.customWhiteBalance
                ? "Tak"
                : "Nie",
          },
          { label: "Formaty plików", value: camera.fileFormat ?? "Brak danych" },
          {
            label: "Jakość JPEG",
            value: camera.jpegQualityLevels ?? "Brak danych",
          },
          { label: "Proporcje obrazu", value: camera.imageRatio ?? "Brak danych" },
          {
            label: "Tryby ekspozycji",
            value: camera.exposureModes ?? "Brak danych",
          },
          {
            label: "Maks. czas otwarcia",
            value: camera.maxShutterSpeed ?? "Brak danych",
          },
          {
            label: "Min. czas otwarcia",
            value: camera.minShutterSpeed ?? "Brak danych",
          },
          {
            label: "Kompensacja ekspozycji",
            value: camera.exposureCompensation ?? "Brak danych",
          },
        ],
      },
      {
        title: "Video",
        items: [
          { label: "Specyfikacja wideo", value: camera.videoSpecs ?? "Brak danych" },
          {
            label: "Port mikrofonu",
            value:
              camera.micPort == null ? "Brak danych" : camera.micPort ? "Tak" : "Nie",
          },
          {
            label: "Port słuchawkowy",
            value:
              camera.headphonePort == null
                ? "Brak danych"
                : camera.headphonePort
                ? "Tak"
                : "Nie",
          },
        ],
      },
      {
        title: "Display & Connectivity",
        items: [
          { label: "Ekran", value: camera.screenSpecs ?? "Brak danych" },
          {
            label: "Dotyk",
            value:
              camera.touchscreen == null
                ? "Brak danych"
                : camera.touchscreen
                ? "Tak"
                : "Nie",
          },
          { label: "Łączność", value: camera.wireless ?? "Brak danych" },
          { label: "Nośniki", value: camera.storageTypes ?? "Brak danych" },
          { label: "Wersja USB", value: camera.usbVersion ?? "Brak danych" },
          {
            label: "Ładowanie USB",
            value:
              camera.usbCharging == null
                ? "Brak danych"
                : camera.usbCharging
                ? "Tak"
                : "Nie",
          },
        ],
      },
      {
        title: "Miscellaneous",
        items: [
          {
            label: "Wbudowany flash",
            value:
              camera.builtInFlash == null
                ? "Brak danych"
                : camera.builtInFlash
                ? "Tak"
                : "Nie",
          },
          {
            label: "GPS",
            value: camera.gps == null ? "Brak danych" : camera.gps ? "Tak" : "Nie",
          },
          {
            label: "Live view",
            value:
              camera.liveView == null ? "Brak danych" : camera.liveView ? "Tak" : "Nie",
          },
          {
            label: "Samowyzwalacz",
            value:
              camera.selfTimer == null
                ? "Brak danych"
                : camera.selfTimer
                ? "Tak"
                : "Nie",
          },
          {
            label: "Opis baterii",
            value: camera.batteryDescription ?? "Brak danych",
          },
          {
            label: "Czas pracy baterii (CIPA)",
            value: camera.batteryCipa ?? "Brak danych",
          },
          {
            label: "Kraj marki",
            value: camera.brand.country ?? "Brak danych",
          },
          {
            label: "Rok założenia marki",
            value: camera.brand.foundedYear
              ? String(camera.brand.foundedYear)
              : "Brak danych",
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
      sensorFormat: related.sensorFormat ?? null,
      brand: related.brand.name,
    })),
  };
}