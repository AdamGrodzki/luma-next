/**
 * Utility functions for building collection URLs with filters
 */

export interface BuildCollectionUrlParams {
  brand?: string;
  sensor?: string;
  type?: string;
  q?: string;
  yearFrom?: number;
  yearTo?: number;
  sort?: string;
}

export function buildCollectionUrl(params: BuildCollectionUrlParams): string {
  const urlParams = new URLSearchParams();

  if (params.brand) urlParams.set('brand', params.brand);
  if (params.sensor) urlParams.set('sensor', params.sensor);
  if (params.type) urlParams.set('type', params.type);
  if (params.q?.trim()) urlParams.set('q', params.q.trim());
  if (typeof params.yearFrom === 'number') urlParams.set('yearFrom', String(params.yearFrom));
  if (typeof params.yearTo === 'number') urlParams.set('yearTo', String(params.yearTo));
  if (params.sort) urlParams.set('sort', params.sort);

  const query = urlParams.toString();
  return query ? `/collection?${query}` : '/collection';
}

export function parseYearInput(value: string | undefined): number | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}
