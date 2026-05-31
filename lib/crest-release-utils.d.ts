export const CREST_RELEASES_API_URL: string;
export const CREST_RELEASES_PAGE_URL: string;
export const CREST_RELEASES_LOCAL_URL: string;

export function formatReleaseDate(value: string): string;

export function formatAssetSize(size: number): string;

export function sortReleaseAssets<T extends { name?: string }>(assets?: T[]): T[];

export function filterVisibleReleases<T extends { draft?: boolean }>(
  releases?: T[]
): T[];

export function normalizeReleasePayload<
  T extends {
    draft?: boolean;
    published_at?: string | null;
  },
>(payload: T[] | { releases?: T[] } | unknown): T[];

export function getReleasePayloadFetchedAt(
  payload: unknown,
  fallback?: number
): number;

export function getReleaseSummary(body?: string): string;

export function getReleaseLabel(release?: { prerelease?: boolean }): string;
