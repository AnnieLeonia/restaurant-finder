import * as Location from "expo-location";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { Header, Nav, RestaurantList, SearchBar } from "@/client/components";
import SearchFiltersDrawer from "@/client/components/search/SearchFiltersDrawer";
import { COLORS, icons } from "@/client/constants";
import { loadLastSearch, saveLastSearch } from "@/client/storage/lastSearch";
import styles from "@/client/styles/search";
import {
  DEFAULT_FILTERS,
  SearchFilterState,
  parseSearchFilters,
} from "@/common/searchFilters";
import { Restaurant, RestaurantsResponse } from "@/common/types";

interface LocationProps {
  lat: number;
  lng: number;
}

const keywordFromParams = (id: unknown): string => {
  if (Array.isArray(id)) return id[0] ?? "";
  if (typeof id === "string") return id;
  return "";
};

const Search = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const keyword = keywordFromParams(params.id);

  const [hydrating, setHydrating] = useState(true);
  const [isLoadingCoords, setIsLoadingCoords] = useState(false);
  const [location, setLocation] = useState<LocationProps | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await loadLastSearch();
      if (cancelled) return;

      if (saved) {
        setLocation({ lat: saved.lat, lng: saved.lng });
        setFilters(parseSearchFilters(saved.filters));
        setHydrating(false);
        return;
      }

      setIsLoadingCoords(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Tillstånd för plats avvisades");
        setIsLoadingCoords(false);
        setHydrating(false);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ lat: coords.latitude, lng: coords.longitude });
      setIsLoadingCoords(false);
      setHydrating(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const onPersist = useCallback(
    (payload: { response: RestaurantsResponse; filtered: Restaurant[] }) => {
      if (!location) return;
      saveLastSearch({
        timestamp: Date.now(),
        keyword,
        lat: location.lat,
        lng: location.lng,
        radiusMeters: filters.radiusMeters,
        filters,
        response: payload.response,
        filteredResults: payload.filtered,
      }).catch(() => {});
    },
    [location, filters, keyword],
  );

  const showListLoader = hydrating || isLoadingCoords;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <SearchBar />
      </Header>

      <View style={styles.view}>
        <View style={styles.toolbarRow}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Tillbaka"
          >
            <Image source={icons.chevronLeft} style={styles.backIcon} />
          </Pressable>
          <Pressable
            onPress={() => setFiltersDrawerOpen(true)}
            style={styles.filterButton}
            accessibilityRole="button"
            accessibilityLabel="Filter"
          >
            <Image source={icons.filter} style={styles.filterIcon} />
          </Pressable>
        </View>
        <Text style={styles.headerText}>{keyword || "Anything"}</Text>

        <SearchFiltersDrawer
          visible={filtersDrawerOpen}
          onClose={() => setFiltersDrawerOpen(false)}
          filters={filters}
          onChange={setFilters}
        />

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <View style={styles.listArea}>
          {showListLoader ? (
            <>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text>Hämtar plats...</Text>
            </>
          ) : location ? (
            <RestaurantList
              key={`${location.lat}-${location.lng}-${keyword}-${filters.radiusMeters}`}
              lat={location.lat}
              lng={location.lng}
              keyword={keyword}
              distance={filters.radiusMeters}
              filters={filters}
              onPersist={onPersist}
            />
          ) : (
            <Text>Ingen plats vald.</Text>
          )}
        </View>
      </View>

      <Nav />
    </SafeAreaView>
  );
};

export default Search;
