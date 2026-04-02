import AsyncStorage from "@react-native-async-storage/async-storage";

import { Restaurant } from "@/common/types";

const STORAGE_KEY = "restaurant_finder_favorites";

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function looksLikeRestaurant(x: unknown): x is Restaurant {
  if (!isRecord(x)) return false;
  const loc = x.location;
  const dist = x.distance;
  if (!isRecord(loc) || !isRecord(dist)) return false;
  return (
    typeof x.place_id === "string" &&
    typeof x.name === "string" &&
    typeof x.rating === "number" &&
    typeof x.reviews === "number" &&
    typeof x.address === "string" &&
    Array.isArray(x.photos) &&
    Array.isArray(x.types) &&
    typeof x.price_level === "number" &&
    typeof loc.lat === "number" &&
    typeof loc.lng === "number" &&
    typeof dist.meters === "number" &&
    typeof dist.minutes === "number"
  );
}

export async function loadFavorites(): Promise<Restaurant[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(looksLikeRestaurant);
    const seen = new Set<string>();
    return valid.filter(r => {
      if (seen.has(r.place_id)) return false;
      seen.add(r.place_id);
      return true;
    });
  } catch {
    return [];
  }
}

export async function saveFavorites(list: Restaurant[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
