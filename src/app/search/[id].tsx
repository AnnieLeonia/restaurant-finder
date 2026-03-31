import * as Location from "expo-location";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Header, Nav, RestaurantList, SearchBar } from "@/client/components";
import SearchFilters from "@/client/components/search/SearchFilters";
import { COLORS, icons } from "@/client/constants";
import { loadLastSearch, saveLastSearch } from "@/client/storage/lastSearch";
import styles from "@/client/styles/search";
import { DEFAULT_FILTERS, SearchFilterState } from "@/common/searchFilters";
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
  const [addressInput, setAddressInput] = useState("");
  const [addressLabel, setAddressLabel] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await loadLastSearch();
      if (cancelled) return;

      if (saved) {
        setLocation({ lat: saved.lat, lng: saved.lng });
        setFilters(saved.filters);
        setAddressLabel(saved.addressLabel);
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

  const handleGeocode = async () => {
    const q = addressInput.trim();
    if (!q) {
      setErrorMsg("Ange en adress eller ort.");
      return;
    }
    setErrorMsg("");
    setIsLoadingCoords(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Tillstånd för plats krävs för att söka adress.");
        return;
      }
      const results = await Location.geocodeAsync(q);
      if (!results.length) {
        setErrorMsg("Hittade ingen plats för den adressen.");
        return;
      }
      const first = results[0];
      setLocation({ lat: first.latitude, lng: first.longitude });
      setAddressLabel(q);
    } catch {
      setErrorMsg("Kunde inte slå upp adressen. Försök igen.");
    } finally {
      setIsLoadingCoords(false);
    }
  };

  const handleUseMyLocation = async () => {
    setErrorMsg("");
    setIsLoadingCoords(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Tillstånd för plats avvisades");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ lat: coords.latitude, lng: coords.longitude });
      setAddressLabel("");
      setAddressInput("");
    } catch {
      setErrorMsg("Kunde inte hämta din plats.");
    } finally {
      setIsLoadingCoords(false);
    }
  };

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
        addressLabel,
      }).catch(() => {});
    },
    [location, filters, keyword, addressLabel],
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
        <Pressable onPress={() => router.back()}>
          <Image source={icons.chevronLeft} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerText}>{keyword || "Anything"}</Text>

        <View style={styles.locationBlock}>
          <Text style={styles.locationLabel}>Plats</Text>
          <TextInput
            value={addressInput}
            onChangeText={setAddressInput}
            placeholder="Adress eller ort"
            placeholderTextColor={COLORS.gray}
            style={styles.addressInput}
            onSubmitEditing={handleGeocode}
            returnKeyType="search"
          />
          <View style={styles.locationButtons}>
            <Pressable style={styles.secondaryButton} onPress={handleGeocode}>
              <Text style={styles.secondaryButtonText}>Sök plats</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={handleUseMyLocation}
            >
              <Text style={styles.secondaryButtonText}>Min plats</Text>
            </Pressable>
          </View>
          {addressLabel ? (
            <Text style={styles.addressHint}>Aktiv: {addressLabel}</Text>
          ) : null}
        </View>

        <SearchFilters filters={filters} onChange={setFilters} />

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
