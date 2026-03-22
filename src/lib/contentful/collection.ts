import type { Brand } from "@/src/types/contentful";
import type {
    CollectionBrand,
    CollectionSensorGroup,
    CollectionCameraCard,
} from "../../../components/collection/types";
import { getBrands } from "./brands";
import { getCameras } from "./cameras";

type CollectionFilters = {
    activeBrandSlug?: string;
    sensor?: string;
    type?: string;
    q?: string;
    yearFrom?: number;
    yearTo?: number;
    sort?: string;
};

function normalizeText(value: string | null | undefined): string {
    if (!value) return "";

    return value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function normalizeSensorGroupName(sensorFormat: string | null | undefined): string {
    if (!sensorFormat) return "Inne";

    const value = normalizeText(sensorFormat);

    if (
        value.includes("full frame") ||
        value.includes("pelna klatka") ||
        value === "ff"
    ) {
        return "Pełna Klatka";
    }

    if (value.includes("aps-c")) return "APS-C";
    if (value.includes("aps-h")) return "APS-H";

    if (
        value.includes('1"') ||
        value.includes("1-inch") ||
        value === "1 inch"
    ) {
        return '1"';
    }

    if (
        value.includes("medium format") ||
        value.includes("sredni format")
    ) {
        return "Średni Format";
    }

    return "Inne";
}

function matchesSearch(camera: {
    name: string;
    brand: { name: string };
    mount?: string | null;
    sensorFormat?: string | null;
    cameraType?: string | null;
    description?: string | null;
}, query: string): boolean {
    const haystack = normalizeText(
        [
            camera.name,
            camera.brand.name,
            camera.mount ?? "",
            camera.sensorFormat ?? "",
            camera.cameraType ?? "",
            camera.description ?? "",
        ].join(" ")
    );

    return haystack.includes(normalizeText(query));
}

function sortCollectionCameras(
    cameras: CollectionCameraCard[],
    sort?: string
): CollectionCameraCard[] {
    const items = [...cameras];

    switch (sort) {
        case "name-asc":
            return items.sort((a, b) => a.name.localeCompare(b.name));

        case "name-desc":
            return items.sort((a, b) => b.name.localeCompare(a.name));

        case "year-asc":
            return items.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));

        case "year-desc":
            return items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

        default:
            return items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }
}

export async function getCollectionData(
    filters?: CollectionFilters
): Promise<{
    brands: CollectionBrand[];
    activeBrand: Brand | null;
    sensorGroups: CollectionSensorGroup[];
    totalCount: number;
}> {
    const [brands, cameras] = await Promise.all([getBrands(), getCameras()]);

    const activeBrand =
        brands.find((brand) => brand.slug === filters?.activeBrandSlug) ??
        brands[0] ??
        null;

    const collectionBrands: CollectionBrand[] = brands.map((brand) => ({
        slug: brand.slug,
        name: brand.name,
        count: cameras.filter((camera) => camera.brand.slug === brand.slug).length,
        active: activeBrand ? brand.slug === activeBrand.slug : false,
    }));

    if (!activeBrand) {
        return {
            brands: collectionBrands,
            activeBrand: null,
            sensorGroups: [],
            totalCount: 0,
        };
    }

    let filtered = cameras.filter((camera) => camera.brand.slug === activeBrand.slug);

    if (filters?.sensor) {
        filtered = filtered.filter(
            (camera) => normalizeSensorGroupName(camera.sensorFormat) === filters.sensor
        );
    }

    if (filters?.type) {
        filtered = filtered.filter((camera) => camera.cameraType === filters.type);
    }

    if (filters?.q) {
        filtered = filtered.filter((camera) => matchesSearch(camera, filters.q!));
    }


    if (typeof filters?.yearFrom === "number") {
        filtered = filtered.filter(
            (camera) =>
                camera.releaseYear == null || camera.releaseYear >= filters.yearFrom!
        );
    }

    if (typeof filters?.yearTo === "number") {
        filtered = filtered.filter(
            (camera) =>
                camera.releaseYear == null || camera.releaseYear <= filters.yearTo!
        );
    }

    const groupedMap = new Map<string, CollectionCameraCard[]>();

    for (const camera of filtered) {
        const groupName = normalizeSensorGroupName(camera.sensorFormat);
        const existing = groupedMap.get(groupName) ?? [];

    existing.push({
        name: camera.name,
        slug: camera.slug,
        year: camera.releaseYear,
        type: camera.cameraType,
        imageUrl: camera.heroImageUrl || camera.galleryUrls[0] || null,
    });

        groupedMap.set(groupName, existing);
    }

    const order = ["Średni Format", "Pełna Klatka", "APS-H", "APS-C", '1"', "Inne"];

    const sensorGroups: CollectionSensorGroup[] = order
        .filter((name) => groupedMap.has(name))
        .map((name, index) => {
            const groupCameras = sortCollectionCameras(
                groupedMap.get(name) ?? [],
                filters?.sort
            );

        return {
            name,
            count: groupCameras.length,
            expanded: index === 0,
            cameras: groupCameras,
        };
        });

    return {
        brands: collectionBrands,
        activeBrand,
        sensorGroups,
        totalCount: filtered.length,
    };
}