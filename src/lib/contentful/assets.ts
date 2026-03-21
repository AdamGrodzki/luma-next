export function getAssetUrl(asset: any): string | null {
    const url = asset?.fields?.file?.url;
    if (!url) return null;
    return url.startsWith("//") ? `https:${url}` : url;
    }

    export function getAssetUrls(assets: any[] | undefined): string[] {
    if (!Array.isArray(assets)) return [];
    return assets
        .map((asset) => getAssetUrl(asset))
        .filter((url): url is string => Boolean(url));
    }

    export function buildContentfulImageUrl(
    url: string,
    options?: { w?: number; h?: number; fit?: "fill" | "pad" | "scale" | "crop" | "thumb" }
    ) {
    const parsed = new URL(url);
    if (options?.w) parsed.searchParams.set("w", String(options.w));
    if (options?.h) parsed.searchParams.set("h", String(options.h));
    if (options?.fit) parsed.searchParams.set("fit", options.fit);
    return parsed.toString();
}