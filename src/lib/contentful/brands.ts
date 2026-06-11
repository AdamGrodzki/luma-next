import { contentful, withContentfulErrorHandling } from "../client";
import { getAssetUrl } from "./assets";
import type { Brand, BrandEntry, BrandEntrySkeleton } from "@/src/types/contentful";

/** Mapuje surowy entry Contentful na typ Brand */
export function mapBrand(item: BrandEntry): Brand {
  const fields = item.fields;
  return {
    id: item.sys.id,
    name: fields.name,
    slug: fields.slug,
    country: fields.country ?? null,
    foundedYear: fields.foundedYear ?? null,
    description: fields.description ?? null,
    logoUrl: getAssetUrl(fields.logo),
  };
}

export async function getBrands(): Promise<Brand[]> {
  return withContentfulErrorHandling(async () => {
    const res = await contentful.getEntries<BrandEntrySkeleton>({
      content_type: "brand",
      order: ["fields.name"] as any,
      include: 2,
    });

    return res.items.map(mapBrand);
  }, "fetch brands");
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return withContentfulErrorHandling(async () => {
    const res = await contentful.getEntries<BrandEntrySkeleton>({
      content_type: "brand",
      "fields.slug": slug,
      limit: 1,
    });

    const item = res.items[0];
    if (!item) return null;

    return mapBrand(item);
  }, `fetch brand by slug: ${slug}`);
}