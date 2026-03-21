import fs from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";
import { getEnvironment } from "./config";

type AssetLink = {
  sys: {
    type: "Link";
    linkType: "Asset";
    id: string;
  };
};

const uploadedCache = new Map<string, string>();

function toAssetLink(id: string): AssetLink {
  return {
    sys: {
      type: "Link",
      linkType: "Asset",
      id,
    },
  };
}

async function findAssetByTitle(env: any, title: string) {
  const res = await env.getAssets({
    "fields.title": title,
    limit: 1,
  });
  return res.items[0] || null;
}

export async function uploadAssetFromFile(params: {
  filePath: string;
  title: string;
}) {
  const env = await getEnvironment();
  const fullPath = path.join(process.cwd(), params.filePath);

  if (uploadedCache.has(fullPath)) {
    return toAssetLink(uploadedCache.get(fullPath)!);
  }

  const existing = await findAssetByTitle(env, params.title);
  if (existing) {
    uploadedCache.set(fullPath, existing.sys.id);
    return toAssetLink(existing.sys.id);
  }

  const fileBuffer = await fs.readFile(fullPath);
  const fileName = path.basename(fullPath);
  const contentType =
    mime.lookup(fullPath) || "application/octet-stream";

  const upload = await env.createUpload({
    file: fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength),
  });

  const asset = await env.createAsset({
    fields: {
      title: {
        "en-US": params.title,
      },
      file: {
        "en-US": {
          contentType,
          fileName,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  const processed = await asset.processForAllLocales();
  const published = await processed.publish();

  uploadedCache.set(fullPath, published.sys.id);
  return toAssetLink(published.sys.id);
}