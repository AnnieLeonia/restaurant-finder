import AsyncStorage from "@react-native-async-storage/async-storage";

import { SearchFilterState } from "@/common/searchFilters";
import { Restaurant, RestaurantsResponse } from "@/common/types";

const STORAGE_KEY = "restaurant_finder_last_search";

export interface LastSearchSnapshot {
  timestamp: number;
  keyword: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  filters: SearchFilterState;
  /** Raw API response (before client-side filters). */
  response: RestaurantsResponse;
  /** Results after client filters; used for display parity with saved state. */
  filteredResults: Restaurant[];
}

export async function saveLastSearch(
  snapshot: LastSearchSnapshot,
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export async function loadLastSearch(): Promise<LastSearchSnapshot | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LastSearchSnapshot;
  } catch {
    return null;
  }
}
