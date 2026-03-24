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
        title: "General",
        items: [
          { label: "Producent", value: camera.brand.name },
          { label: "Model", value: camera.name },
          { label: "Typ aparatu", value: camera.cameraType ?? "Brak danych" },
          {
            label: "Data premiery",
            value: camera.releaseYear ? String(camera.releaseYear) : "Brak danych",
          },
          {
            label: "Cena startowa",
            value: camera.launchPrice ?? "Brak danych",
          },
        ],
      },
      {
        title: "Sensor",
        items: [
          { label: "Format sensora", value: camera.sensorFormat ?? "Brak danych" },
          {
            label: "Maks. rozdzielczość",
            value: camera.maxResolution ?? "Brak danych",
          },
          { label: "Zakres ISO", value: camera.isoRange ?? "Brak danych" },
          {
            label: "Procesor obrazu",
            value: camera.imageProcessor ?? "Brak danych",
          },
        ],
      },
      {
        title: "Performance",
        items: [
          {
            label: "Zdjęcia seryjne",
            value: camera.continuousShooting ?? "Brak danych",
          },
          { label: "Mocowanie", value: camera.mount ?? "Brak danych" },
          {
            label: "Uszczelnienie",
            value:
              camera.weatherSealed == null
                ? "Brak danych"
                : camera.weatherSealed
                ? "Tak"
                : "Nie",
          },
        ],
      },
      {
        title: "Video",
        items: [
          { label: "Video", value: camera.videoSpecs ?? "Brak danych" },
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
        ],
      },
      {
        title: "Body",
        items: [
          {
            label: "Waga",
            value: camera.weight ? `${camera.weight} g` : "Brak danych",
          },
          { label: "Wymiary", value: camera.dimensions ?? "Brak danych" },
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