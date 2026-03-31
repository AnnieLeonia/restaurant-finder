export interface SearchFilterState {
  minRating: number;
  minReviews: number;
  radiusMeters: number;
  openNowOnly: boolean;
}

export const DEFAULT_FILTERS: SearchFilterState = {
  minRating: 4.5,
  minReviews: 10,
  radiusMeters: 3000,
  openNowOnly: false,
};

export const RATING_PRESETS = [4.5, 4.0, 3.5] as const;

export const RADIUS_PRESETS_METERS = [1000, 1500, 3000, 5000] as const;

export const MAX_RADIUS_METERS = 50_000;
