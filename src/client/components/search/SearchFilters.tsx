import Slider from "@react-native-community/slider";
import React from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

import { COLORS } from "@/client/constants";
import {
  MAX_RADIUS_METERS_USER,
  MIN_RADIUS_METERS,
  RATING_PRESETS,
  SearchFilterState,
} from "@/common/searchFilters";

import styles from "./searchFilters.style";

export interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (next: SearchFilterState) => void;
}

function formatRadiusMeters(m: number): string {
  if (m >= 1000) {
    const km = m / 1000;
    return km === Math.floor(km) ? `${km} km` : `${km.toFixed(1)} km`;
  }
  return `${m} m`;
}

const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  const setRating = (minRating: number) => onChange({ ...filters, minRating });

  const setRadiusFromSlider = (value: number) => {
    const rounded = Math.round(value / 100) * 100;
    const radiusMeters = Math.min(
      MAX_RADIUS_METERS_USER,
      Math.max(MIN_RADIUS_METERS, rounded),
    );
    onChange({ ...filters, radiusMeters });
  };

  const setOpenNowOnly = (openNowOnly: boolean) =>
    onChange({ ...filters, openNowOnly });

  const setIncludeNewLocations = (includeNewLocations: boolean) =>
    onChange({ ...filters, includeNewLocations });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Betyg (min)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {RATING_PRESETS.map(r => (
          <Pressable
            key={r}
            onPress={() => setRating(r)}
            style={[styles.chip, filters.minRating === r && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                filters.minRating === r && styles.chipTextActive,
              ]}
            >
              {r}+
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sliderBlock}>
        <View style={styles.sliderHeader}>
          <Text style={styles.sectionLabel}>Avstånd</Text>
          <Text style={styles.sliderValue}>
            {formatRadiusMeters(filters.radiusMeters)}
          </Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={MIN_RADIUS_METERS}
          maximumValue={MAX_RADIUS_METERS_USER}
          step={100}
          value={filters.radiusMeters}
          onValueChange={setRadiusFromSlider}
          minimumTrackTintColor={COLORS.tertiary}
          maximumTrackTintColor={COLORS.gray}
          thumbTintColor={COLORS.tertiary}
        />
        <View style={styles.sliderTicks}>
          <Text style={styles.tickLabel}>100 m</Text>
          <Text style={styles.tickLabel}>10 km</Text>
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Nya ställen</Text>
        <Switch
          value={filters.includeNewLocations}
          onValueChange={setIncludeNewLocations}
          trackColor={{ false: COLORS.gray, true: COLORS.tertiary }}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Öppen nu</Text>
        <Switch
          value={filters.openNowOnly}
          onValueChange={setOpenNowOnly}
          trackColor={{ false: COLORS.gray, true: COLORS.tertiary }}
        />
      </View>

      <Text style={styles.hint}>
        {filters.includeNewLocations
          ? "Minst 10 recensioner (nya ställen)."
          : "Minst 100 recensioner."}
      </Text>
    </View>
  );
};

export default SearchFilters;
