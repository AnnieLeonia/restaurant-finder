import React from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { baseUrl, icons } from "@/client/constants";
import { Restaurant } from "@/common/types";

import styles from "./restaurantList.style";

export type RestaurantItemType = Restaurant & { id: string };

const mapsUrl = (data: Restaurant) =>
  `https://www.google.com/maps/search/?api=1&query=${data.name} ${data.address}&query_place_id=${data.place_id}`;

function openStatusLabel(openNow?: boolean): string {
  if (openNow === true) return "Öppen nu";
  if (openNow === false) return "Stängt";
  return "Öppettider okända";
}

const HERO_RATIO = 0.52;

export interface RestaurantItemProps {
  data: RestaurantItemType;
  itemHeight: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const RestaurantItem = ({
  data,
  itemHeight,
  isFavorite = false,
  onToggleFavorite,
}: RestaurantItemProps) => {
  const firstPhoto = data.photos?.[0];
  const heroHeight = Math.max(Math.round(itemHeight * HERO_RATIO), 120);

  return (
    <Pressable
      onPress={() => Linking.openURL(mapsUrl(data))}
      style={[styles.card, { height: itemHeight }]}
    >
      <View style={[styles.heroWrap, { height: heroHeight }]}>
        {firstPhoto ? (
          <Image
            source={{ uri: baseUrl + firstPhoto }}
            style={[styles.heroImage, { height: heroHeight }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.heroPlaceholder, { height: heroHeight }]}>
            <Text style={styles.placeholderText}>Ingen bild</Text>
          </View>
        )}
        {onToggleFavorite ? (
          <Pressable
            style={styles.favoritePressable}
            onPress={onToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Ta bort från sparade" : "Spara restaurang"
            }
          >
            <Image
              source={isFavorite ? icons.heart : icons.heartOutline}
              style={styles.favoriteIcon}
              resizeMode="contain"
            />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={styles.bodyScrollContent}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        <Text style={styles.name} numberOfLines={3}>
          {data.name}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>{data.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({data.reviews} omdömen)</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            data.open_now === true && styles.statusOpen,
            data.open_now === false && styles.statusClosed,
          ]}
        >
          <Text style={styles.statusText}>
            {openStatusLabel(data.open_now)}
          </Text>
        </View>

        <View style={[styles.row, styles.rowFirst]}>
          <Text style={styles.rowLabel}>Adress</Text>
          <Text style={styles.rowValue}>{data.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Avstånd</Text>
          <Text style={styles.rowValue}>
            {data.distance.meters} m · ca {data.distance.minutes} min
          </Text>
        </View>

        <Text style={styles.mapsHint}>Tryck för att öppna i Google Maps</Text>
      </ScrollView>
    </Pressable>
  );
};

export default RestaurantItem;
