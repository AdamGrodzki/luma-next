import type { Brand } from "@/src/types/contentful";
import type {
    CollectionBrand,
    CollectionSensorGroup,
    CollectionCameraCard,
    } from "../../../components/collection/types";
    import { getBrands } from "./brands";
    import { getCameras } from "./cameras";

    function normalizeSensorGroupName(sensorFormat: string | null | undefined): string {
    if (!sensorFormat) return "Inne";

    const value = sensorFormat.trim().toLowerCase();

    if (value.includes("full frame") || value.includes("pełna klatka") || value === "ff") {
        return "Pełna Klatka";
    }

    if (value.includes("aps-c")) return "APS-C";
    if (value.includes("aps-h")) return "APS-H";
    if (value.includes('1"') || value.includes("1-inch") || value === "1 inch") {
        return '1"';
    }
    if (value.includes("medium format") || value.includes("średni format")) {
        return "Średni Format";
    }

    return "Inne";
    }

    export async function getCollectionData(filters?: {
    activeBrandSlug?: string;
    sensor?: string;
    type?: string;
    q?: string;
    yearFrom?: number;
    yearTo?: number;
    }): Promise<{
    brands: CollectionBrand[];
    activeBrand: Brand | null;
    sensorGroups: CollectionSensorGroup[];
    totalCount: number;
    }> {
    const [brands, cameras] = await Promise.all([getBrands(), getCameras()]);

    const activeBrand =
        brands.find((brand) => brand.slug === filters?.activeBrandSlug) ?? brands[0] ?? null;

    const collectionBrands: CollectionBrand[] = brands.map((brand) => ({
        slug: brand.slug,
        name: brand.name,
        count: cameras.filter((camera) => camera.brand.slug === brand.slug).length,
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
        const q = filters.q.toLowerCase();
        filtered = filtered.filter((camera) =>
        `${camera.name} ${camera.brand.name} ${camera.mount ?? ""} ${camera.sensorFormat ?? ""}`
            .toLowerCase()
            .includes(q)
        );
    }

    if (filters?.yearFrom) {
        filtered = filtered.filter(
        (camera) => !camera.releaseYear || camera.releaseYear >= filters.yearFrom!
        );
    }

    if (filters?.yearTo) {
        filtered = filtered.filter(
        (camera) => !camera.releaseYear || camera.releaseYear <= filters.yearTo!
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
        const groupCameras = groupedMap.get(name) ?? [];
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