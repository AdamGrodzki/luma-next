/**
 * Utility do budowania URL'i z search parametrami
 * Centralne miejsce dla logiki query string'ów
 */

interface QueryParams {
  brand?: string;
  sensor?: string;
  type?: string;
  q?: string;
  yearFrom?: number;
  yearTo?: number;
  sort?: string;
  [key: string]: string | number | undefined;
}

/**
 * Buduje URL z parametrami query
 * @example
 * buildUrl("/kolekcja", { brand: "canon", sensor: "35mm" })
 * // "/kolekcja?brand=canon&sensor=35mm"
 */
export function buildUrl(
  basePath: string,
  params?: QueryParams | null
): string {
  if (!params || Object.keys(params).length === 0) {
    return basePath;
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Extraktuje parametry z URL
 */
export function parseUrlParams(searchParams: URLSearchParams): QueryParams {
  return {
    brand: searchParams.get("brand") || undefined,
    sensor: searchParams.get("sensor") || undefined,
    type: searchParams.get("type") || undefined,
    q: searchParams.get("q") || undefined,
    yearFrom: searchParams.get("yearFrom")
      ? Number(searchParams.get("yearFrom"))
      : undefined,
    yearTo: searchParams.get("yearTo")
      ? Number(searchParams.get("yearTo"))
      : undefined,
    sort: searchParams.get("sort") || undefined,
  };
}

/**
 * Updateuje jeden parametr w URL'u bez tracenia reszty
 */
export function updateUrlParam(
  currentParams: QueryParams,
  key: keyof QueryParams,
  value: any
): QueryParams {
  if (value === undefined || value === null || value === "") {
    const { [key]: _, ...rest } = currentParams;
    return rest;
  }

  return {
    ...currentParams,
    [key]: value,
  };
}

/**
 * Usuwa parametr z URL
 */
export function removeUrlParam(
  currentParams: QueryParams,
  key: keyof QueryParams
): QueryParams {
  const { [key]: _, ...rest } = currentParams;
  return rest;
}
