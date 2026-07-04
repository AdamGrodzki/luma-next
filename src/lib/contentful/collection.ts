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

function normalizeSensorGroupName(sensorSize: string | null | undefined): string {
    if (!sensorSize) return "Inne";

    const value = normalizeText(sensorSize);

    if (
        value.includes("pelna klatka") ||
        value.includes("full frame") ||
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
    sensorSize?: string | null;
    cameraType?: string | null;
    description?: string | null;
}, query: string): boolean {
    const haystack = normalizeText(
        [
            camera.name,
            camera.brand.name,
            camera.mount ?? "",
            camera.sensorSize ?? "",
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
    isGlobalView: boolean;
}> {
    const [brands, cameras] = await Promise.all([getBrands(), getCameras()]);

    // If activeBrandSlug is explicitly provided, find that brand
    // If it's "all" or not provided, show all brands
    const activeBrand = filters?.activeBrandSlug && filters.activeBrandSlug !== "all"
        ? brands.find((brand) => brand.slug === filters.activeBrandSlug) ?? null
        : null;

    const isGlobalView = !activeBrand;

    // Start with all cameras (or brand-specific if activeBrand exists)
    let filtered = activeBrand
        ? cameras.filter((camera) => camera.brand.slug === activeBrand.slug)
        : cameras;

    // Apply common filters (sensor, type, search, years)
    if (filters?.sensor) {
        filtered = filtered.filter(
            (camera) => normalizeSensorGroupName(camera.sensorSize) === filters.sensor
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

    // Calculate brand counts based on filtered results (without brand filter)
    // This shows how many cameras match the filters for each brand
    let camerasForCounting = cameras;

    if (filters?.sensor) {
        camerasForCounting = camerasForCounting.filter(
            (camera) => normalizeSensorGroupName(camera.sensorSize) === filters.sensor
        );
    }

    if (filters?.type) {
        camerasForCounting = camerasForCounting.filter(
            (camera) => camera.cameraType === filters.type
        );
    }

    if (filters?.q) {
        camerasForCounting = camerasForCounting.filter(
            (camera) => matchesSearch(camera, filters.q!)
        );
    }

    if (typeof filters?.yearFrom === "number") {
        camerasForCounting = camerasForCounting.filter(
            (camera) =>
                camera.releaseYear == null || camera.releaseYear >= filters.yearFrom!
        );
    }

    if (typeof filters?.yearTo === "number") {
        camerasForCounting = camerasForCounting.filter(
            (camera) =>
                camera.releaseYear == null || camera.releaseYear <= filters.yearTo!
        );
    }

    const collectionBrands: CollectionBrand[] = brands.map((brand) => ({
        slug: brand.slug,
        name: brand.name,
        count: camerasForCounting.filter((camera) => camera.brand.slug === brand.slug).length,
        active: activeBrand ? brand.slug === activeBrand.slug : false,
    }));

    const groupedMap = new Map<string, CollectionCameraCard[]>();

    for (const camera of filtered) {
        const groupName = normalizeSensorGroupName(camera.sensorSize);
        const existing = groupedMap.get(groupName) ?? [];

        existing.push({
            name: camera.name,
            slug: camera.slug,
            year: camera.releaseYear,
            type: camera.cameraType,
            imageUrl: camera.heroImageUrl || camera.galleryUrls[0] || null,
            brandName: camera.brand.name,
            brandSlug: camera.brand.slug,
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
        isGlobalView,
    };
}