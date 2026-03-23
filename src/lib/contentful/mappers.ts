import type { CameraDetailData } from "@/components/camera-detail/types";

type RelatedCameraLike = {
  id: string;
  slug: string;
  name: string;
  releaseYear?: number | null;
  sensorFormat?: string | null;
  heroImageUrl?: string | null;
  brand: {
    name: string;
  };
};

type CameraLike = {
  slug: string;
  name: string;
  description?: string | null;
  releaseYear?: number | null;
  cameraType?: string | null;
  sensorFormat?: string | null;
  mount?: string | null;
  heroImageUrl?: string | null;
  galleryUrls: string[];
  brand: {
    name: string;
    slug: string;
    logoUrl?: string | null;
  };
};

export function mapContentfulCameraToDetail(
  camera: CameraLike,
  relatedCameras: RelatedCameraLike[] = []
): CameraDetailData {
  return {
    slug: camera.slug,
    brand: {
      name: camera.brand.name,
      logo: camera.brand.logoUrl ?? null,
    },
    name: camera.name,
    subtitle: camera.description ?? null,
    image: camera.heroImageUrl ?? null,
    gallery: camera.galleryUrls ?? [],
    description: camera.description ?? null,
    story: camera.description ?? null,

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
      label: "Niepopularny",
      score: 37,
      updatedAt: "23 czerwca 2026",
      summary: "Standardowa popularność, typowa dla masowego sprzętu.",
      recommendedLenses:
        camera.brand.name === "Canon"
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
        { name: "Francja", value: 39 },
        { name: "Włochy", value: 34 },
      ],
    },

    marketValue: {
      average: 3300,
      currency: "PLN",
      min: 3000,
      max: 3600,
      history: [
        { label: "01.06", value: 3350 },
        { label: "02.06", value: 3300 },
        { label: "04.06", value: 3500 },
        { label: "05.06", value: 3150 },
        { label: "07.06", value: 3250 },
        { label: "08.06", value: 3470 },
        { label: "09.06", value: 3560 },
        { label: "10.06", value: 3390 },
        { label: "11.06", value: 3540 },
        { label: "12.06", value: 3550 },
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
        ],
      },
      {
        title: "Sensor",
        items: [
          { label: "Format sensora", value: camera.sensorFormat ?? "Brak danych" },
          { label: "Mocowanie", value: camera.mount ?? "Brak danych" },
        ],
      },
      {
        title: "Opis",
        items: [
          {
            label: "Charakterystyka",
            value: camera.description ?? "Brak opisu",
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