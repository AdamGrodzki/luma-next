import { contentful } from "../client";
import { getAssetUrl } from "./assets";
import type { Brand } from "@/src/types/contentful";

export async function getBrands(): Promise<Brand[]> {
    const res = await contentful.getEntries({
        content_type: "brand",
        order: ["fields.name"],
        include: 2,
    });

    return res.items.map((item: any) => ({
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
        country: item.fields.country ?? null,
        foundedYear: item.fields.foundedYear ?? null,
        description: item.fields.description ?? null,
        logoUrl: getAssetUrl(item.fields.logo),
    }));
    }

    export async function getBrandBySlug(slug: string): Promise<Brand | null> {
    const res = await contentful.getEntries({
        content_type: "brand",
        "fields.slug": slug,
        limit: 1,
    });

    const item: any = res.items[0];
    if (!item) return null;

    return {
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
        country: item.fields.country ?? null,
        foundedYear: item.fields.foundedYear ?? null,
        description: item.fields.description ?? null,
        logoUrl: getAssetUrl(item.fields.logo),
    };
}