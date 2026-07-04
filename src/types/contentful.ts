import type { Entry, EntryFieldTypes } from "contentful";

// ─────────────────────────────────────────────────────────────
// Raw Contentful Entry Types (API response shapes)
// ─────────────────────────────────────────────────────────────

export interface ContentfulAsset {
  fields: {
    file?: {
      url: string;
    };
  };
}

// Skeleton types for Contentful SDK v10+
export interface BrandEntrySkeleton {
  contentTypeId: "brand";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    country?: EntryFieldTypes.Text;
    foundedYear?: EntryFieldTypes.Integer;
    description?: EntryFieldTypes.Text;
    logo?: EntryFieldTypes.AssetLink;
  };
}

export interface CameraEntrySkeleton {
  contentTypeId: "camera";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    brand?: EntryFieldTypes.EntryLink<BrandEntrySkeleton>;
    cameraType?: EntryFieldTypes.Text;
    sensorSize?: EntryFieldTypes.Text;
    lensMount?: EntryFieldTypes.Text;
    releaseYear?: EntryFieldTypes.Integer;
    description?: EntryFieldTypes.Text;
    shortDescription?: EntryFieldTypes.Text;
    story?: EntryFieldTypes.Text;
    launchPrice?: EntryFieldTypes.Text;
    WeightIncBatteries?: EntryFieldTypes.Number;
    dimensions?: EntryFieldTypes.Text;
    weatherSealed?: EntryFieldTypes.Boolean;
    maxResolution?: EntryFieldTypes.Text;
    ISO?: EntryFieldTypes.Text;
    continuousDrive?: EntryFieldTypes.Text;
    imageProcessor?: EntryFieldTypes.Text;
    videoSpecs?: EntryFieldTypes.Text;
    microphonePort?: EntryFieldTypes.Boolean;
    headphonePort?: EntryFieldTypes.Boolean;
    screenSpecs?: EntryFieldTypes.Text;
    touchscreen?: EntryFieldTypes.Boolean;
    wireless?: EntryFieldTypes.Text;
    storageTypes?: EntryFieldTypes.Text;
    popularityScore?: EntryFieldTypes.Number;
    popularityLabel?: EntryFieldTypes.Text;
    marketPriceMin?: EntryFieldTypes.Number;
    marketPriceAvg?: EntryFieldTypes.Number;
    marketPriceMax?: EntryFieldTypes.Number;
    recommendedLenses?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    heroImage?: EntryFieldTypes.AssetLink;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    msrp?: EntryFieldTypes.Symbol;
    bodyType?: EntryFieldTypes.Symbol;
    sensorType?: EntryFieldTypes.Symbol;
    articulatedLcd?: EntryFieldTypes.Symbol;
    viewfinderType?: EntryFieldTypes.Symbol;
    viewfinderCoverage?: EntryFieldTypes.Symbol;
    viewFinderMagnification?: EntryFieldTypes.Symbol;
    viewFinderResolution?: EntryFieldTypes.Integer;
    imageStabilization?: EntryFieldTypes.Symbol;
    effectivePixels?: EntryFieldTypes.Integer;
    numberOfFocusPoints?: EntryFieldTypes.Integer;
    autofocus?: EntryFieldTypes.Symbol;
    manualFocus?: EntryFieldTypes.Boolean;
    whiteBalancePresets?: EntryFieldTypes.Integer;
    customWhiteBalance?: EntryFieldTypes.Boolean;
    fileFormat?: EntryFieldTypes.Symbol;
    jpegQualityLevels?: EntryFieldTypes.Symbol;
    imageRatioWh?: EntryFieldTypes.Symbol;
    exposureModes?: EntryFieldTypes.Symbol;
    maximumShutterSpeed?: EntryFieldTypes.Symbol;
    minimumShutterSpeed?: EntryFieldTypes.Symbol;
    exposureCompensation?: EntryFieldTypes.Symbol;
    isoBoostMin?: EntryFieldTypes.Integer;
    isoBoostMax?: EntryFieldTypes.Integer;
    builtInFlash?: EntryFieldTypes.Boolean;
    GPS?: EntryFieldTypes.Boolean;
    liveView?: EntryFieldTypes.Boolean;
    selfTimer?: EntryFieldTypes.Boolean;
    USB?: EntryFieldTypes.Symbol;
    usbCharging?: EntryFieldTypes.Boolean;
    batteryDescription?: EntryFieldTypes.Symbol;
    batteryLifeCIPA?: EntryFieldTypes.Integer;
  };
}

export type BrandEntry = Entry<BrandEntrySkeleton, undefined, string>;
export type CameraEntry = Entry<CameraEntrySkeleton, undefined, string>;

// ─────────────────────────────────────────────────────────────
// Mapped Domain Types (used in the app)
// ─────────────────────────────────────────────────────────────

export type Brand = {
  id: string;
  name: string;
  slug: string;
  country?: string | null;
  foundedYear?: number | null;
  description?: string | null;
  logoUrl?: string | null;
};

export type Camera = {
  id: string;
  name: string;
  slug: string;

  brand: Brand;

  cameraType?: string | null;
  sensorSize?: string | null;
  lensMount?: string | null;
  releaseYear?: number | null;

  description?: string | null;
  shortDescription?: string | null;
  story?: string | null;

  launchPrice?: string | null;
  WeightIncBatteries?: number | null;
  dimensions?: string | null;
  weatherSealed?: boolean | null;

  maxResolution?: string | null;
  ISO?: string | null;
  continuousDrive?: string | null;
  imageProcessor?: string | null;

  videoSpecs?: string | null;
  microphonePort?: boolean | null;
  headphonePort?: boolean | null;

  screenSpecs?: string | null;
  touchscreen?: boolean | null;
  wireless?: string | null;
  storageTypes?: string | null;

  popularityScore?: number | null;
  popularityLabel?: string | null;

  marketPriceMin?: number | null;
  marketPriceAvg?: number | null;
  marketPriceMax?: number | null;

  recommendedLenses?: string[];

  heroImageUrl?: string | null;
  galleryUrls: string[];

  msrp?: string | null;
  bodyType?: string | null;
  sensorType?: string | null;
  articulatedLcd?: string | null;
  viewfinderType?: string | null;
  viewfinderCoverage?: string | null;
  viewFinderMagnification?: string | null;
  viewFinderResolution?: number | null;
  imageStabilization?: string | null;
  effectivePixels?: number | null;
  numberOfFocusPoints?: number | null;
  autofocus?: string | null;
  manualFocus?: boolean | null;
  whiteBalancePresets?: number | null;
  customWhiteBalance?: boolean | null;
  fileFormat?: string | null;
  jpegQualityLevels?: string | null;
  ImageRatioWh?: string | null;
  exposureModes?: string | null;
  maximumShutterSpeed?: string | null;
  minimumShutterSpeed?: string | null;
  exposureCompensation?: string | null;
  isoBoostMin?: number | null;
  isoBoostMax?: number | null;
  builtInFlash?: boolean | null;
  GPS?: boolean | null;
  liveView?: boolean | null;
  selfTimer?: boolean | null;
  USB?: string | null;
  usbCharging?: boolean | null;
  batteryDescription?: string | null;
  batteryLifeCIPA?: number | null;
};