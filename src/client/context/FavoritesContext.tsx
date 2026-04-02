import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadFavorites, saveFavorites } from "@/client/storage/favorites";
import { Restaurant } from "@/common/types";

type FavoritesContextValue = {
  favorites: Restaurant[];
  ready: boolean;
  isFavorite: (placeId: string) => boolean;
  toggleFavorite: (r: Restaurant) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadFavorites().then(list => {
      if (!cancelled) {
        setFavorites(list);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isFavorite = useCallback(
    (placeId: string) => favorites.some(f => f.place_id === placeId),
    [favorites],
  );

  const toggleFavorite = useCallback((r: Restaurant) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.place_id === r.place_id);
      const next = exists
        ? prev.filter(f => f.place_id !== r.place_id)
        : [...prev, r];
      saveFavorites(next).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ favorites, ready, isFavorite, toggleFavorite }),
    [favorites, ready, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
