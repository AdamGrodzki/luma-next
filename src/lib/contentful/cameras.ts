import { contentful, withContentfulErrorHandling } from "../client";
import { getAssetUrl } from "./assets";
import { mapBrand } from "./brands";
import type { Camera, CameraEntry, CameraEntrySkeleton, BrandEntry } from "@/src/types/contentful";

const UNKNOWN_BRAND = {
  id: "unknown",
  name: "Unknown",
  slug: "unknown",
  country: null,
  foundedYear: null,
  description: null,
  logoUrl: null,
} as const;

function mapCamera(item: CameraEntry): Camera {
  const fields = item.fields;
  const brandEntry = fields.brand as BrandEntry | undefined;

  return {
    id: item.sys.id,
    name: fields.name,
    slug: fields.slug,

    brand: brandEntry ? mapBrand(brandEntry) : UNKNOWN_BRAND,

    cameraType: fields.cameraType ?? null,
    sensorFormat: fields.sensorFormat ?? null,
    mount: fields.mount ?? null,
    releaseYear: fields.releaseYear ?? null,

    description: fields.description ?? null,
    shortDescription: fields.shortDescription ?? null,
    story: fields.story ?? null,

    launchPrice: fields.launchPrice ?? null,
    weight: fields.weight ?? null,
    dimensions: fields.dimensions ?? null,
    weatherSealed: fields.weatherSealed ?? null,

    maxResolution: fields.maxResolution ?? null,
    isoRange: fields.isoRange ?? null,
    continuousShooting: fields.continuousShooting ?? null,
    imageProcessor: fields.imageProcessor ?? null,

    videoSpecs: fields.videoSpecs ?? null,
    micPort: fields.micPort ?? null,
    headphonePort: fields.headphonePort ?? null,

    screenSpecs: fields.screenSpecs ?? null,
    touchscreen: fields.touchscreen ?? null,
    wireless: fields.wireless ?? null,
    storageTypes: fields.storageTypes ?? null,

    popularityScore: fields.popularityScore ?? null,
    popularityLabel: fields.popularityLabel ?? null,

    marketPriceMin: fields.marketPriceMin ?? null,
    marketPriceAvg: fields.marketPriceAvg ?? null,
    marketPriceMax: fields.marketPriceMax ?? null,

    recommendedLenses: (fields.recommendedLenses as string[] | undefined) ?? [],

    heroImageUrl: getAssetUrl(fields.heroImage),
    galleryUrls: Array.isArray(fields.gallery)
      ? fields.gallery
          .map((asset) => getAssetUrl(asset))
          .filter((url): url is string => Boolean(url))
      : [],

    msrp: fields.msrp ?? null,
    bodyType: fields.bodyType ?? null,
    sensorType: fields.sensorType ?? null,
    articulatedLcd: fields.articulatedLcd ?? null,
    viewfinderType: fields.viewfinderType ?? null,
    viewfinderCoverage: fields.viewfinderCoverage ?? null,
    viewfinderMagnification: fields.viewfinderMagnification ?? null,
    viewfinderResolution: fields.viewfinderResolution ?? null,
    imageStabilization: fields.imageStabilization ?? null,
    effectivePixels: fields.effectivePixels ?? null,
    numberFocusPoints: fields.numberFocusPoints ?? null,
    autofocus: fields.autofocus ?? null,
    manualFocus: fields.manualFocus ?? null,
    whiteBalancePresets: fields.whiteBalancePresets ?? null,
    customWhiteBalance: fields.customWhiteBalance ?? null,
    fileFormat: fields.fileFormat ?? null,
    jpegQualityLevels: fields.jpegQualityLevels ?? null,
    imageRatio: fields.imageRatio ?? null,
    exposureModes: fields.exposureModes ?? null,
    maxShutterSpeed: fields.maxShutterSpeed ?? null,
    minShutterSpeed: fields.minShutterSpeed ?? null,
    exposureCompensation: fields.exposureCompensation ?? null,
    isoBoostMin: fields.isoBoostMin ?? null,
    isoBoostMax: fields.isoBoostMax ?? null,
    builtInFlash: fields.builtInFlash ?? null,
    gps: fields.gps ?? null,
    liveView: fields.liveView ?? null,
    selfTimer: fields.selfTimer ?? null,
    usbVersion: fields.usbVersion ?? null,
    usbCharging: fields.usbCharging ?? null,
    batteryDescription: fields.batteryDescription ?? null,
    batteryCipa: fields.batteryCipa ?? null,
  };
}

export async function getCameras(): Promise<Camera[]> {
  return withContentfulErrorHandling(async () => {
    const res = await contentful.getEntries<CameraEntrySkeleton>({
      content_type: "camera",
      include: 2,
      order: ["fields.releaseYear", "fields.name"] as any,
    });

    return res.items.map(mapCamera);
  }, "fetch cameras");
}

export async function getCamerasPaginated(page: number = 1, limit: number = 12): Promise<{
  cameras: Camera[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  return withContentfulErrorHandling(async () => {
    const skip = (page - 1) * limit;

    const res = await contentful.getEntries<CameraEntrySkeleton>({
      content_type: "camera",
      include: 2,
      order: ["fields.releaseYear", "fields.name"] as any,
      limit,
      skip,
    });

    return {
      cameras: res.items.map(mapCamera),
      total: res.total,
      totalPages: Math.ceil(res.total / limit),
      currentPage: page,
    };
  }, `fetch cameras page ${page}`);
}

export async function getCameraBySlug(slug: string): Promise<Camera | null> {
  return withContentfulErrorHandling(async () => {
    const res = await contentful.getEntries<CameraEntrySkeleton>({
      content_type: "camera",
      "fields.slug": slug,
      include: 2,
      limit: 1,
    });

    const item = res.items[0];
    if (!item) return null;

    return mapCamera(item);
  }, `fetch camera by slug: ${slug}`);
}

export async function getRelatedCameras(
  currentSlug: string,
  options: {
    brandSlug?: string | null;
    sensorFormat?: string | null;
    limit?: number;
  }
): Promise<Camera[]> {
  return withContentfulErrorHandling(async () => {
    const res = await contentful.getEntries<CameraEntrySkeleton>({
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
  }, `fetch related cameras for: ${currentSlug}`);
}