export type NormalizedBrand = {
  legacyId: string;
  name: string;
  slug: string;
  country?: string;
  foundedYear?: number;
  description?: string;
  sourceUrl?: string;
  logoPath?: string;
};

export type NormalizedCamera = {
  legacyId: string;
  name: string;
  slug: string;
  brandSlug: string;
  releaseYear?: number;
  cameraType?: string;
  mount?: string;
  sensorFormat?: string;
  description?: string;
  specs?: Record<string, unknown>;
  status?: string;
  sourceUrl?: string;
  heroImagePath?: string;
  galleryPaths?: string[];
};