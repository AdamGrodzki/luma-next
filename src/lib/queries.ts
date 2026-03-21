import { contentful } from "./contentful";
import type { Brand, Camera } from "@/types/contentful";
import type {
  CollectionBrand,
  CollectionSensorGroup,
  CollectionCameraCard,
} from "../../components/collection/types";

function getAssetUrl(asset: any): string | null {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

export async function getBrands(): Promise<Brand[]> {
  const res = await contentful.getEntries({
    content_type: "brand",
    order: ["fields.name"],
    include: 2,
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    country: item.fields.country ?? null,
    foundedYear: item.fields.foundedYear ?? null,
    description: item.fields.description ?? null,
    logoUrl: getAssetUrl(item.fields.logo),
  }));
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const res = await contentful.getEntries({
    content_type: "brand",
    "fields.slug": slug,
    limit: 1,
  });

  const item: any = res.items[0];
  if (!item) return null;

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

export async function getCameras(): Promise<Camera[]> {
  const res = await contentful.getEntries({
    content_type: "camera",
    order: ["-fields.releaseYear", "fields.name"],
    include: 2,
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    releaseYear: item.fields.releaseYear ?? null,
    cameraType: item.fields.cameraType ?? null,
    mount: item.fields.mount ?? null,
    sensorFormat: item.fields.sensorFormat ?? null,
    description: item.fields.description ?? null,
    specs: item.fields.specs ?? null,
    heroImageUrl: getAssetUrl(item.fields.heroImage),
    brand: {
      name: item.fields.brand?.fields?.name ?? "Unknown brand",
      slug: item.fields.brand?.fields?.slug ?? "",
    },
  }));
}

export async function getCameraBySlug(slug: string): Promise<Camera | null> {
  const res = await contentful.getEntries({
    content_type: "camera",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });

  const item: any = res.items[0];
  if (!item) return null;

  return {
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    releaseYear: item.fields.releaseYear ?? null,
    cameraType: item.fields.cameraType ?? null,
    mount: item.fields.mount ?? null,
    sensorFormat: item.fields.sensorFormat ?? null,
    description: item.fields.description ?? null,
    specs: item.fields.specs ?? null,
    heroImageUrl: getAssetUrl(item.fields.heroImage),
    brand: {
      name: item.fields.brand?.fields?.name ?? "Unknown brand",
      slug: item.fields.brand?.fields?.slug ?? "",
    },
  };
}

function normalizeSensorGroupName(sensorFormat: string | null | undefined): string {
  if (!sensorFormat) return "Inne";

  const value = sensorFormat.trim().toLowerCase();

  if (
    value.includes("full frame") ||
    value.includes("pełna klatka") ||
    value === "ff"
  ) {
    return "Pełna Klatka";
  }

  if (value.includes("aps-c")) return "APS-C";
  if (value.includes("aps-h")) return "APS-H";
  if (value.includes('1"') || value.includes("1-inch") || value === "1 inch") {
    return '1"';
  }
  if (value.includes("medium format") || value.includes("średni format")) {
    return "Średni Format";
  }

  return "Inne";
}
export async function getCollectionData(filters?: {
  activeBrandSlug?: string;
  sensor?: string;
  type?: string;
  q?: string;
  yearFrom?: number;
  yearTo?: number;
}): Promise<{
  brands: CollectionBrand[];
  activeBrand: Brand | null;
  sensorGroups: CollectionSensorGroup[];
  totalCount: number;
}> {
  const [brands, cameras] = await Promise.all([getBrands(), getCameras()]);

  const effectiveBrandSlug = filters?.activeBrandSlug || brands[0]?.slug || null;

  const activeBrand = effectiveBrandSlug
    ? brands.find((brand) => brand.slug === effectiveBrandSlug) ?? null
    : null;

  const brandCounts = new Map<string, number>();
  for (const camera of cameras) {
    const slug = camera.brand.slug;
    if (!slug) continue;
    brandCounts.set(slug, (brandCounts.get(slug) ?? 0) + 1);
  }

  const collectionBrands: CollectionBrand[] = brands.map((brand) => ({
    name: brand.name,
    slug: brand.slug,
    count: brandCounts.get(brand.slug) ?? 0,
    active: brand.slug === effectiveBrandSlug,
  }));

  let filteredCameras = effectiveBrandSlug
    ? cameras.filter((camera) => camera.brand.slug === effectiveBrandSlug)
    : cameras;

  if (filters?.sensor) {
    filteredCameras = filteredCameras.filter(
      (camera) => normalizeSensorGroupName(camera.sensorFormat) === filters.sensor
    );
  }

  if (filters?.type) {
    filteredCameras = filteredCameras.filter(
      (camera) =>
        (camera.cameraType ?? "").toLowerCase() === filters.type?.toLowerCase()
    );
  }

  if (filters?.q) {
    const query = filters.q.trim().toLowerCase();
    filteredCameras = filteredCameras.filter((camera) =>
      camera.name.toLowerCase().includes(query)
    );
  }

  if (typeof filters?.yearFrom === "number" && !Number.isNaN(filters.yearFrom)) {
    filteredCameras = filteredCameras.filter(
      (camera) => (camera.releaseYear ?? 0) >= filters.yearFrom!
    );
  }

  if (typeof filters?.yearTo === "number" && !Number.isNaN(filters.yearTo)) {
    filteredCameras = filteredCameras.filter(
      (camera) => (camera.releaseYear ?? 9999) <= filters.yearTo!
    );
  }

  const grouped = new Map<string, CollectionCameraCard[]>();

  for (const camera of filteredCameras) {
    const groupName = normalizeSensorGroupName(camera.sensorFormat);
    const current = grouped.get(groupName) ?? [];
    current.push({
      name: camera.name,
      slug: camera.slug,
      year: camera.releaseYear,
      type: camera.cameraType,
    });
    grouped.set(groupName, current);
  }

  const preferredOrder = [
    "Średni Format",
    "Pełna Klatka",
    "APS-H",
    "APS-C",
    '1"',
    "Inne",
  ];

  const sensorGroups: CollectionSensorGroup[] = preferredOrder
    .filter((groupName) => grouped.has(groupName))
    .map((groupName, index) => {
      const items = grouped.get(groupName) ?? [];
      return {
        name: groupName,
        count: items.length,
        expanded: index === 0,
        cameras: items.sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearA !== yearB) return yearB - yearA;
          return a.name.localeCompare(b.name);
        }),
      };
    });

  return {
    brands: collectionBrands,
    activeBrand,
    sensorGroups,
    totalCount: filteredCameras.length,
  };
}