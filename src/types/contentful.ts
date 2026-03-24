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
  sensorFormat?: string | null;
  mount?: string | null;
  releaseYear?: number | null;

  description?: string | null;
  shortDescription?: string | null;
  story?: string | null;

  launchPrice?: string | null;
  weight?: number | null;
  dimensions?: string | null;
  weatherSealed?: boolean | null;

  maxResolution?: string | null;
  isoRange?: string | null;
  continuousShooting?: string | null;
  imageProcessor?: string | null;

  videoSpecs?: string | null;
  micPort?: boolean | null;
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
};