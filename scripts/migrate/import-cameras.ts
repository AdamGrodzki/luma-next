import { getEnvironment } from "./config";
import { readJsonFile } from "./utils";
import type { NormalizedCamera } from "./types";
import type { BrandIdMap } from "./import-brands";

async function findCameraBySlug(env: any, slug: string) {
  const res = await env.getEntries({
    content_type: "camera",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] || null;
}

export async function importCameras(brandMap: BrandIdMap) {
  const env = await getEnvironment();
  const cameras = await readJsonFile<NormalizedCamera[]>("data/normalized/cameras.json");

  for (const camera of cameras) {
    const brandId = brandMap[camera.brandSlug];

    if (!brandId) {
      console.warn(`Skipping ${camera.slug}: missing brand "${camera.brandSlug}"`);
      continue;
    }

    const existing = await findCameraBySlug(env, camera.slug);

    const fields: Record<string, any> = {
      name: { "en-US": camera.name },
      slug: { "en-US": camera.slug },
      legacyId: { "en-US": camera.legacyId },
      brand: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: brandId,
          },
        },
      },
    };

    if (typeof camera.releaseYear === "number") {
      fields.releaseYear = { "en-US": camera.releaseYear };
    }

    if (camera.cameraType) {
      fields.cameraType = { "en-US": camera.cameraType };
    }

    if (camera.mount) {
      fields.mount = { "en-US": camera.mount };
    }

    if (camera.sensorFormat) {
      fields.sensorFormat = { "en-US": camera.sensorFormat };
    }

    if (camera.description) {
      fields.description = { "en-US": camera.description };
    }

    if (camera.specs) {
      fields.specs = { "en-US": camera.specs };
    }

    if (camera.status) {
      fields.status = { "en-US": camera.status };
    }

    if (camera.sourceUrl) {
      fields.sourceUrl = { "en-US": camera.sourceUrl };
    }

    let entry;

    if (existing) {
      existing.fields = {
        ...existing.fields,
        ...fields,
      };
      entry = await existing.update();
      console.log(`Updated camera: ${camera.slug}`);
    } else {
      entry = await env.createEntry("camera", { fields });
      console.log(`Created camera: ${camera.slug}`);
    }

    await entry.publish();
  }
}