import { contentful } from "../client";
import { safeContentfulCall } from "./error-handler";
import { getAssetUrl } from "./assets";
import type { Brand, Camera } from "@/src/types/contentful";

function mapBrand(item: any): Brand {
  return {
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    country: item.fields.country ?? null,
    foundedYear: item.fields.foundedYear ?? null,
    description: item.fields.description ?? null,
    logoUrl: getAssetUrl(item.fields.logo),
  };
}

function mapCamera(item: any): Camera {
  const brandEntry = item.fields.brand;

  return {
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,

    brand: brandEntry ? mapBrand(brandEntry) : {
      id: "unknown",
      name: "Unknown",
      slug: "unknown",
      country: null,
      foundedYear: null,
      description: null,
      logoUrl: null,
    },

    cameraType: item.fields.cameraType ?? null,
    sensorFormat: item.fields.sensorFormat ?? null,
    mount: item.fields.mount ?? null,
    releaseYear: item.fields.releaseYear ?? null,

    description: item.fields.description ?? null,
    shortDescription: item.fields.shortDescription ?? null,
    story: item.fields.story ?? null,

    launchPrice: item.fields.launchPrice ?? null,
    weight: item.fields.weight ?? null,
    dimensions: item.fields.dimensions ?? null,
    weatherSealed: item.fields.weatherSealed ?? null,

    maxResolution: item.fields.maxResolution ?? null,
    isoRange: item.fields.isoRange ?? null,
    continuousShooting: item.fields.continuousShooting ?? null,
    imageProcessor: item.fields.imageProcessor ?? null,

    videoSpecs: item.fields.videoSpecs ?? null,
    micPort: item.fields.micPort ?? null,
    headphonePort: item.fields.headphonePort ?? null,

    screenSpecs: item.fields.screenSpecs ?? null,
    touchscreen: item.fields.touchscreen ?? null,
    wireless: item.fields.wireless ?? null,
    storageTypes: item.fields.storageTypes ?? null,

    popularityScore: item.fields.popularityScore ?? null,
    popularityLabel: item.fields.popularityLabel ?? null,

    marketPriceMin: item.fields.marketPriceMin ?? null,
    marketPriceAvg: item.fields.marketPriceAvg ?? null,
    marketPriceMax: item.fields.marketPriceMax ?? null,

    recommendedLenses: item.fields.recommendedLenses ?? [],

    heroImageUrl: getAssetUrl(item.fields.heroImage),
    galleryUrls: Array.isArray(item.fields.gallery)
      ? item.fields.gallery
        .map((asset: any) => getAssetUrl(asset))
          .filter((url: string | null): url is string => Boolean(url))
      : [],
  };
}

export async function getCameras(): Promise<Camera[]> {
  return safeContentfulCall(
    async () => {
      const res = await contentful.getEntries({
        content_type: "camera",
        include: 2,
        order: ["fields.releaseYear", "fields.name"],
      });

      return res.items.map(mapCamera);
    },
    [],
    "getCameras"
  );
}

export async function getCameraBySlug(slug: string): Promise<Camera | null> {
  return safeContentfulCall(
    async () => {
      const res = await contentful.getEntries({
        content_type: "camera",
        "fields.slug": slug,
        include: 2,
        limit: 1,
      });

      const item = res.items[0];
      if (!item) return null;

      return mapCamera(item);
    },
    null,
    `getCameraBySlug(${slug})`
  );
}

export async function getRelatedCameras(
  currentSlug: string,
  options: {
    brandSlug?: string | null;
    sensorFormat?: string | null;
    limit?: number;
  }
): Promise<Camera[]> {
  return safeContentfulCall(
    async () => {
  // Fetch cameras excluding current one
      const res = await contentful.getEntries({
        content_type: "camera",
        include: 2,
        "fields.slug[ne]": currentSlug,
        limit: 50, // Fetch enough to have options after filtering
        order: ["-fields.releaseYear"],
      });

      let cameras = res.items.map(mapCamera);

      // Filter by brand or sensor format
      cameras = cameras.filter((camera) => {
        const sameBrand = options.brandSlug
          ? camera.brand.slug === options.brandSlug
          : false;

        const sameSensor = options.sensorFormat
          ? camera.sensorFormat === options.sensorFormat
          : false;

        return sameBrand || sameSensor;
      });

      return cameras.slice(0, options.limit ?? 3);
    },
    [],
    `getRelatedCameras(${currentSlug})`
  );
}