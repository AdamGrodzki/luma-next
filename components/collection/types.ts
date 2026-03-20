export type CollectionBrand = {
  name: string;
  slug: string;
  count: number;
  active?: boolean;
};

export type CollectionCameraCard = {
  name: string;
  slug: string;
  year?: number | null;
  type?: string | null;
};

export type CollectionSensorGroup = {
  name: string;
  count: number;
  expanded?: boolean;
  cameras: CollectionCameraCard[];
};