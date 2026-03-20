import fs from "node:fs/promises";
import path from "node:path";

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(process.cwd(), relativePath);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as T;
}

export async function publishIfDraft(entry: any) {
  const isPublished = Boolean(entry.sys.publishedVersion);

  if (!isPublished) {
    return await entry.publish();
  }

  const hasChanges = entry.sys.version >= (entry.sys.publishedVersion ?? 0) + 2;
  if (hasChanges) {
    return await entry.publish();
  }

  return entry;
}

export function logStep(message: string) {
  console.log(`\n=== ${message} ===`);
}