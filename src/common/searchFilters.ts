export interface SearchFilterState {
  minRating: number;
  /** Search radius in meters (Nearby Search). */
  radiusMeters: number;
  openNowOnly: boolean;
  /**
   * When true: at least 10 reviews. When false (default): at least 100 reviews.
   */
  includeNewLocations: boolean;
}

/** User-facing search radius range (meters). */
export const MIN_RADIUS_METERS = 100;
export const MAX_RADIUS_METERS_USER = 10_000;

/** Google Places allows up to 50 km; UI caps at 10 km. */
export const MAX_RADIUS_METERS = 50_000;

export const DEFAULT_FILTERS: SearchFilterState = {
  minRating: 4.5,
  radiusMeters: 3000,
  openNowOnly: false,
  includeNewLocations: false,
};

export const RATING_PRESETS = [4.5, 4.0, 3.5] as const;

export function effectiveMinReviews(filters: SearchFilterState): number {
  return filters.includeNewLocations ? 10 : 100;
}

/** Migrate persisted filters from older app versions. */
export function parseSearchFilters(raw: unknown): SearchFilterState {
  const o = raw as Record<string, unknown> | null;
  if (!o || typeof o !== "object") {
    return { ...DEFAULT_FILTERS };
  }

  let includeNewLocations = DEFAULT_FILTERS.includeNewLocations;
  if (typeof o.includeNewLocations === "boolean") {
    includeNewLocations = o.includeNewLocations;
  } else if (typeof o.minReviews === "number") {
    includeNewLocations = o.minReviews <= 10;
  }

  let radiusMeters = DEFAULT_FILTERS.radiusMeters;
  if (typeof o.radiusMeters === "number" && Number.isFinite(o.radiusMeters)) {
    radiusMeters = Math.round(o.radiusMeters);
    radiusMeters = Math.min(
      MAX_RADIUS_METERS_USER,
      Math.max(MIN_RADIUS_METERS, radiusMeters),
    );
  }

  return {
    minRating:
      typeof o.minRating === "number" && Number.isFinite(o.minRating)
        ? o.minRating
        : DEFAULT_FILTERS.minRating,
    radiusMeters,
    openNowOnly:
      typeof o.openNowOnly === "boolean"
        ? o.openNowOnly
        : DEFAULT_FILTERS.openNowOnly,
    includeNewLocations,
  };
}
