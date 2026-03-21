
export type Brand = {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  foundedYear: number | null;
  description: string | null;
  logoUrl: string | null;
};

export type Camera = {
  id: string;
  name: string;
  slug: string;
  releaseYear: number | null;
  cameraType: string | null;
  mount: string | null;
  sensorFormat: string | null;
  description: string | null;
  specs: Record<string, unknown> | null;
  heroImageUrl: string | null;
  brand: {
    name: string;
    slug: string;
  };
};