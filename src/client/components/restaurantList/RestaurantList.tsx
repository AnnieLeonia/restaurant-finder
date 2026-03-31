import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { COLORS } from "@/client/constants";
import useFetchRestaurant, {
  RestaurantRequestProps,
} from "@/client/hook/useFetchRestaurant";
import useScrollToRandom from "@/client/hook/useScrollToRandom";
import { SearchFilterState, effectiveMinReviews } from "@/common/searchFilters";
import { Restaurant, RestaurantsResponse } from "@/common/types";
import { generateUniqueKey, shuffle } from "@/common/utils";

import RestaurantItem, {
  ITEM_HEIGHT,
  RestaurantItemType,
} from "./RestaurantItem";
import styles from "./restaurantList.style";

export interface RestaurantListProps extends RestaurantRequestProps {
  filters: SearchFilterState;
  onPersist?: (payload: {
    response: RestaurantsResponse;
    filtered: Restaurant[];
  }) => void;
}

function applyFilters(
  results: Restaurant[],
  filters: SearchFilterState,
): Restaurant[] {
  const minReviews = effectiveMinReviews(filters);
  const maxMeters = filters.radiusMeters;
  return results
    .filter(r => r.rating >= filters.minRating)
    .filter(r => r.reviews >= minReviews)
    .filter(r => r.distance.meters <= maxMeters)
    .filter(r => {
      if (!filters.openNowOnly) return true;
      return r.open_now === true;
    });
}

const RestaurantList = (props: RestaurantListProps) => {
  const { filters, onPersist, ...requestProps } = props;
  const { data, isLoading, error } = useFetchRestaurant(requestProps);

  const restaurants = useMemo(
    () => applyFilters(data.results, filters),
    [data.results, filters],
  );

  const [listItems, setListItems] = useState<RestaurantItemType[]>([]);
  const [ref, scrollToRandom] = useScrollToRandom();

  useEffect(() => {
    if (isLoading || error) return;
    onPersist?.({ response: data, filtered: restaurants });
  }, [data, isLoading, error, filters, restaurants, onPersist]);

  useEffect(() => {
    const shuffled = shuffle(restaurants);
    const looped = Array.from({ length: 10 }, () => shuffled).flat();
    setListItems(looped.map(item => ({ ...item, id: generateUniqueKey() })));
  }, [restaurants]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text>Finding restaurants...</Text>
        </>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : restaurants.length > 0 && listItems.length > 0 ? (
        <>
          <FlatList
            ref={ref}
            keyExtractor={item => item.id}
            getItemLayout={(_data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            data={listItems}
            renderItem={({ item }) => (
              <RestaurantItem key={item.id} data={item} />
            )}
            onLayout={async () => {
              scrollToRandom(restaurants.length);
            }}
            onStartReached={() => {
              return new Promise(resolve => {
                setListItems(prev =>
                  shuffle(restaurants)
                    .map(item => ({ ...item, id: generateUniqueKey() }))
                    .concat(prev.slice(0, -restaurants.length)),
                );
                resolve(null);
              });
            }}
            onEndReached={() => {
              return new Promise(resolve => {
                setListItems(prev =>
                  prev.slice(restaurants.length).concat(
                    shuffle(restaurants).map(item => ({
                      ...item,
                      id: generateUniqueKey(),
                    })),
                  ),
                );
                resolve(null);
              });
            }}
            onScrollToIndexFailed={info => {
              console.error(info);
            }}
            onStartReachedThreshold={1}
            onEndReachedThreshold={1}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.cachedText}>
            {data.cached ? "Cached data" : "Live data"}
          </Text>
        </>
      ) : (
        <Text>Inga restauranger matchar dina filter.</Text>
      )}
    </View>
  );
};

export default RestaurantList;
