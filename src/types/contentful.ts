import type { EntryFieldTypes } from "contentful";

export type BrandSkeleton = {
  contentTypeId: "brand";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    country: EntryFieldTypes.Text;
    foundedYear: EntryFieldTypes.Integer;
    description: EntryFieldTypes.RichText;
    logo: EntryFieldTypes.AssetLink;
    heroImage: EntryFieldTypes.AssetLink;
  };
};

export type CameraSkeleton = {
  contentTypeId: "camera";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    brand: EntryFieldTypes.EntryLink<BrandSkeleton>;
    releaseYear: EntryFieldTypes.Integer;
    cameraType: EntryFieldTypes.Text;
    mount: EntryFieldTypes.Text;
    sensorFormat: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    heroImage: EntryFieldTypes.AssetLink;
    gallery: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    specs: EntryFieldTypes.Object;
  };
};