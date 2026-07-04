import fs from "node:fs/promises";
import path from "node:path";
import YAML from "js-yaml";
import { getEnvironment } from "./config";
import type { NormalizedCamera } from "./types";
import { uploadAssetFromFile } from "./upload-assets";

// Parse YAML file using js-yaml
async function parseYamlFile(filePath: string): Promise<Record<string, any>> {
  const content = await fs.readFile(filePath, "utf-8");
  return YAML.load(content) as Record<string, any>;
}

// Map YAML fields to Contentful fields
function mapYamlToContentful(yamlData: Record<string, any>): Record<string, any> {
  const fields: Record<string, any> = {};

  // Mapping of YAML fields to Contentful field IDs with type info
  const fieldMapping: Record<string, { id: string; type: string }> = {
    BodyType: { id: "bodyType", type: "Symbol" },
    WeightIncBatteries: { id: "WeightIncBatteries", type: "Integer" },
    Dimensions: { id: "dimensions", type: "Symbol" },
    LensMount: { id: "lensMount", type: "Symbol" },
    ArticulatedLCD: { id: "articulatedLcd", type: "Symbol" },
    ContinuousDrive: { id: "continuousDrive", type: "Symbol" },
    ViewfinderType: { id: "viewfinderType", type: "Symbol" },
    SensorSize: { id: "sensorSize", type: "Symbol" },
    SensorType: { id: "sensorType", type: "Symbol" },
    ImageStabilization: { id: "imageStabilization", type: "Symbol" },
    EffectivePixels: { id: "effectivePixels", type: "Integer" },
    NumberOfFocusPoints: { id: "numberOfFocusPoints", type: "Integer" },
    ISO: { id: "ISO", type: "Symbol" },
    FileFormat: { id: "fileFormat", type: "Array" },
    ImageRatioWh: { id: "imageRatioWh", type: "Array" },
    MaximumShutterSpeed: { id: "maximumShutterSpeed", type: "Symbol" },
    MinimumShutterSpeed: { id: "minimumShutterSpeed", type: "Symbol" },
    ExposureCompensation: { id: "exposureCompensation", type: "Symbol" },
    TouchScreen: { id: "touchscreen", type: "Boolean" },
    BuiltInFlash: { id: "builtInFlash", type: "Boolean" },
    GPS: { id: "GPS", type: "Boolean" },
    LiveView: { id: "liveView", type: "Boolean" },
    MicrophonePort: { id: "microphonePort", type: "Boolean" },
    SelfTimer: { id: "selfTimer", type: "Boolean" },
    USB: { id: "USB", type: "Symbol" },
    USBCharging: { id: "usbCharging", type: "Boolean" },
    BatteryDescription: { id: "batteryDescription", type: "Symbol" },
    BatteryLifeCIPA: { id: "batteryLifeCIPA", type: "Symbol" },
    ViewfinderCoverage: { id: "viewfinderCoverage", type: "Symbol" },
    viewFinderMagnification: { id: "viewFinderMagnification", type: "Symbol" },
    viewFinderResolution: { id: "viewFinderResolution", type: "Symbol" },
    Autofocus: { id: "autofocus", type: "Array" },
  };

  for (const [yamlKey, fieldInfo] of Object.entries(fieldMapping)) {
    const value = yamlData[yamlKey];
    
    // Skip empty values
    if (value === undefined || value === null || value === "" || value === '""') {
      continue;
    }

    const { id: fieldId, type: fieldType } = fieldInfo;
    let convertedValue: any = value;

    // Type conversions
    if (fieldType === "Boolean") {
      if (value === "Yes" || value === '"Yes"') {
        convertedValue = true;
      } else if (value === "No" || value === '"No"') {
        convertedValue = false;
      } else {
        convertedValue = Boolean(value);
      }
    } else if (fieldType === "Integer") {
      // Extract number from strings like "420 g (0.93 lb / 14.82 oz)" or "1 megapixels"
      const match = String(value).match(/(\d+)/);
      convertedValue = match ? parseInt(match[1], 10) : null;
      if (convertedValue === null) continue;
    } else if (fieldType === "Array") {
      // Handle arrays (ImageRatioWh might be string or array)
      if (Array.isArray(value)) {
        convertedValue = value;
      } else if (typeof value === "string" && value.includes(",")) {
        convertedValue = value.split(",").map(v => v.trim());
      } else {
        convertedValue = [value];
      }
    } else {
      // Remove quotes from strings
      if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
        convertedValue = value.slice(1, -1);
      } else {
        convertedValue = String(value);
      }
    }

    if (convertedValue !== null && convertedValue !== undefined) {
      fields[fieldId] = convertedValue;
    }
  }

  return fields;
}

async function findCameraBySlug(env: any, slug: string) {
  const res = await env.getEntries({
    content_type: "camera",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] || null;
}

async function getBrandIdBySlug(env: any, brandSlug: string) {
  const res = await env.getEntries({
    content_type: "brand",
    "fields.slug": brandSlug,
    limit: 1,
  });

  return res.items[0]?.sys.id || null;
}

async function findBrandById(env: any, brandName: string) {
  // Try to find by name
  const res = await env.getEntries({
    content_type: "brand",
    "fields.name": brandName,
    limit: 1,
  });

  return res.items[0]?.sys.id || null;
}

export async function importSingleCamera(filePath: string) {
  const env = await getEnvironment();

  // Parse YAML
  const yamlData = await parseYamlFile(filePath);
  console.log("✓ Parsed YAML file");

  // Extract basic info
  const name = yamlData.name || "";
  const brandName = yamlData.Brand || yamlData.brand || ""; // Handle both uppercase and lowercase
  const slug = yamlData.slug || name.toLowerCase().replace(/\s+/g, "-");
  const brandSlug = brandName.toLowerCase().replace(/\s+/g, "-");

  console.log(`Brand name from YAML: "${brandName}"`);
  console.log(`Brand slug: "${brandSlug}"`);

  // Get brand ID
  let brandId = await getBrandIdBySlug(env, brandSlug);
  
  // If not found by slug, try by name
  if (!brandId) {
    console.log(`✓ Not found by slug, searching by name: "${brandName}"`);
    brandId = await findBrandById(env, brandName);
  }
  
  if (!brandId) {
    throw new Error(`Brand not found: "${brandName}" (slug: "${brandSlug}")`);
  }
  console.log(`✓ Found brand: ${brandId}`);

  // Check if camera already exists
  const existing = await findCameraBySlug(env, slug);

  // Map YAML fields to Contentful fields
  const mappedFields = mapYamlToContentful(yamlData);
  console.log("✓ Mapped fields to Contentful schema");

  // Build fields for Contentful
  const fields: Record<string, any> = {
    name: { "en-US": name },
    slug: { "en-US": slug },
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

  // Add core mapped fields
  for (const [key, value] of Object.entries(mappedFields)) {
    if (key === "specs") {
      // Specs is sent as a JSON object
      fields[key] = { "en-US": value };
    } else {
      fields[key] = { "en-US": value };
    }
  }

  if (yamlData.releaseYear) {
    fields.releaseYear = { "en-US": parseInt(yamlData.releaseYear, 10) };
  }

  // Handle heroImage if provided
  if (yamlData.heroImage) {
    console.log(`Uploading hero image: ${yamlData.heroImage}`);
    const heroLink = await uploadAssetFromFile({
      filePath: yamlData.heroImage,
      title: `${slug}-hero`,
    });
    fields.heroImage = { "en-US": heroLink };
    console.log(`✓ Uploaded hero image`);
  }

  // Save to Contentful
  let entry;

  if (existing) {
    existing.fields = {
      ...existing.fields,
      ...fields,
    };
    entry = await existing.update();
    console.log(`✓ Updated camera: ${slug}`);
  } else {
    entry = await env.createEntry("camera", { fields });
    console.log(`✓ Created camera: ${slug}`);
  }

  await entry.publish();
  console.log(`✓ Published camera: ${slug}`);
}

// Run if called directly
if (require.main === module) {
  const yamlFile = process.argv[2] || "cameras/agfa_1680.yaml";

  importSingleCamera(yamlFile)
    .then(() => {
      console.log("\n✓ Import completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n✗ Import failed:", error.message);
      process.exit(1);
    });
}
