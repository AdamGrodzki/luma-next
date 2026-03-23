export type CameraHeroStat = {
  label: string;
  value: string;
};

export type CameraPopularityRegion = {
  name: string;
  value: number;
};

export type CameraMarketHistoryPoint = {
  label: string;
  value: number;
};

export type CameraSpecGroup = {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
};

export type RelatedCameraCard = {
  id: string;
  slug: string;
  name: string;
  image?: string | null;
  releaseYear?: number | null;
  sensorFormat?: string | null;
  brand: string;
};

export type CameraDetailData = {
  slug: string;
  brand: {
    name: string;
    logo?: string | null;
  };
  name: string;
  subtitle?: string | null;
  image?: string | null;
  gallery?: string[];
  description?: string | null;
  story?: string | null;

  heroStats: CameraHeroStat[];

  popularity: {
    label: string;
    score: number;
    updatedAt: string;
    summary: string;
    recommendedLenses: string[];
    regions: CameraPopularityRegion[];
  };

  marketValue: {
    average: number;
    currency: string;
    min: number;
    max: number;
    history: CameraMarketHistoryPoint[];
  };

  specs: CameraSpecGroup[];

  related: RelatedCameraCard[];
};