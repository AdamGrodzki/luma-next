import { contentful } from "./contentful";

export async function getBrands() {
  const res = await contentful.getEntries({
    content_type: "brand",
    order: ["fields.name"],
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    country: item.fields.country ?? null,
    foundedYear: item.fields.foundedYear ?? null,
    description: item.fields.description ?? null,
  }));
}

export async function getBrandBySlug(slug: string) {
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
  };
}

export async function getCameras() {
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
    brand: {
      name: item.fields.brand?.fields?.name ?? "Unknown brand",
      slug: item.fields.brand?.fields?.slug ?? "",
    },
  }));
}

export async function getCameraBySlug(slug: string) {
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
    brand: {
      name: item.fields.brand?.fields?.name ?? "Unknown brand",
      slug: item.fields.brand?.fields?.slug ?? "",
    },
  };
}