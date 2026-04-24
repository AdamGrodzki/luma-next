import { contentful } from "../client";
import type { Brand, Camera } from "@/src/types/contentful";

function assetUrl(asset: any): string | null {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapBrand(item: any): Brand {
  return {
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    country: item.fields.country ?? null,
    foundedYear: item.fields.foundedYear ?? null,
    description: item.fields.description ?? null,
    logoUrl: assetUrl(item.fields.logo),
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

    heroImageUrl: assetUrl(item.fields.heroImage),
    galleryUrls: Array.isArray(item.fields.gallery)
      ? item.fields.gallery
          .map((asset: any) => assetUrl(asset))
          .filter((url: string | null): url is string => Boolean(url))
      : [],
  };
}

export async function getCameras(): Promise<Camera[]> {
  const res = await contentful.getEntries({
    content_type: "camera",
    include: 2,
    order: ["fields.releaseYear", "fields.name"],
  });

  return res.items.map(mapCamera);
}

export async function getCameraBySlug(slug: string): Promise<Camera | null> {
  const res = await contentful.getEntries({
    content_type: "camera",
    "fields.slug": slug,
    include: 2,
    limit: 1,
  });

  const item = res.items[0];
  if (!item) return null;

  return mapCamera(item);
}

export async function getRelatedCameras(
  currentSlug: string,
  options: {
    brandSlug?: string | null;
    sensorFormat?: string | null;
    limit?: number;
  }
): Promise<Camera[]> {
  const res = await contentful.getEntries({
    content_type: "camera",
    include: 2,
    limit: options.limit ?? 3,
  });

  const all = res.items.map(mapCamera);

  return all
    .filter((camera) => camera.slug !== currentSlug)
    .filter((camera) => {
      const sameBrand = options.brandSlug
        ? camera.brand.slug === options.brandSlug
        : false;

      const sameSensor = options.sensorFormat
        ? camera.sensorFormat === options.sensorFormat
        : false;

      return sameBrand || sameSensor;
    })
    .slice(0, options.limit ?? 3);
}