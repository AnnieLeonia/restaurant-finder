import React from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

import { COLORS } from "@/client/constants";
import {
  DEFAULT_FILTERS,
  MAX_RADIUS_METERS,
  RADIUS_PRESETS_METERS,
  RATING_PRESETS,
  SearchFilterState,
} from "@/common/searchFilters";

import styles from "./searchFilters.style";

export interface SearchFiltersProps {
  filters: SearchFilterState;
  onChange: (next: SearchFilterState) => void;
}

const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  const setRating = (minRating: number) => onChange({ ...filters, minRating });

  const setRadius = (radiusMeters: number) =>
    onChange({
      ...filters,
      radiusMeters: Math.min(radiusMeters, MAX_RADIUS_METERS),
    });

  const setOpenNowOnly = (openNowOnly: boolean) =>
    onChange({ ...filters, openNowOnly });

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

      <Text style={styles.sectionLabel}>Avstånd</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {RADIUS_PRESETS_METERS.map(m => (
          <Pressable
            key={m}
            onPress={() => setRadius(m)}
            style={[
              styles.chip,
              filters.radiusMeters === m && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                filters.radiusMeters === m && styles.chipTextActive,
              ]}
            >
              {m >= 1000 ? `${m / 1000} km` : `${m} m`}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Öppen nu</Text>
        <Switch
          value={filters.openNowOnly}
          onValueChange={setOpenNowOnly}
          trackColor={{ false: COLORS.gray, true: COLORS.tertiary }}
        />
      </View>

      <Text style={styles.hint}>
        Minst {DEFAULT_FILTERS.minReviews} recensioner.
      </Text>
    </View>
  );
};

export default SearchFilters;
