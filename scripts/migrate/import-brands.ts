import { getEnvironment } from "./config";
import { readJsonFile } from "./utils";
import type { NormalizedBrand } from "./types";

export type BrandIdMap = Record<string, string>;

async function findBrandBySlug(env: any, slug: string) {
  const res = await env.getEntries({
    content_type: "brand",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] || null;
}

export async function importBrands(): Promise<BrandIdMap> {
  const env = await getEnvironment();
  const brands = await readJsonFile<NormalizedBrand[]>("data/normalized/brands.json");

  const brandMap: BrandIdMap = {};

  for (const brand of brands) {
    const existing = await findBrandBySlug(env, brand.slug);

    const fields: Record<string, any> = {
      name: { "en-US": brand.name },
      slug: { "en-US": brand.slug },
      legacyId: { "en-US": brand.legacyId },
    };

    if (brand.country) {
      fields.country = { "en-US": brand.country };
    }

    if (typeof brand.foundedYear === "number") {
      fields.foundedYear = { "en-US": brand.foundedYear };
    }

    if (brand.description) {
      fields.description = { "en-US": brand.description };
    }

    if (brand.sourceUrl) {
      fields.sourceUrl = { "en-US": brand.sourceUrl };
    }

    let entry;

    if (existing) {
      existing.fields = {
        ...existing.fields,
        ...fields,
      };
      entry = await existing.update();
      console.log(`Updated brand: ${brand.slug}`);
    } else {
      entry = await env.createEntry("brand", { fields });
      console.log(`Created brand: ${brand.slug}`);
    }

    entry = await entry.publish();
    brandMap[brand.slug] = entry.sys.id;
  }

  return brandMap;
}