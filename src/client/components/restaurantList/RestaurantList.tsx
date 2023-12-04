import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import useFetchRestaurant, {
  RestaurantRequestProps,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";
import useScrollToRandom from "@/client/hook/useScrollToRandom";
import { generateUniqueKey, shuffle } from "@/common/utils";

import RestaurantItem, {
  ITEM_HEIGHT,
  RestaurantItemType,
} from "./RestaurantItem";
import styles from "./restaurantList.style";

const RestaurantList = (props: RestaurantRequestProps) => {
  const { data, isLoading, error } = useFetchRestaurant(props);

  const restaurants = useMemo(
    () =>
      data.results
        .filter(restaurant => restaurant.distance.minutes < 20)
        .filter(restaurant => restaurant.rating > 3.8),
    [data.results],
  );
  const [listItems, setListItems] = useState<RestaurantItemType[]>([]);
  const [ref, scrollToRandom] = useScrollToRandom();

  useEffect(() => {
    const looped = Array.from({ length: 10 }, () => restaurants).flat();
    const shuffled = shuffle(looped);
    setListItems(shuffled.map(item => ({ ...item, id: generateUniqueKey() })));
  }, [restaurants]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text>Finding restaurants...</Text>
        </>
      ) : error ? (
        <Text>{error}</Text>
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
            onStartReached={() =>
              new Promise(resolve => {
                setListItems(prev =>
                  listItems
                    .map(item => ({ ...item, id: generateUniqueKey() }))
                    .concat(prev.slice(0, -listItems.length)),
                );
                resolve(null);
              })
            }
            onEndReached={() =>
              new Promise(resolve => {
                setListItems(prev =>
                  prev.slice(listItems.length).concat(
                    listItems.map(item => ({
                      ...item,
                      id: generateUniqueKey(),
                    })),
                  ),
                );
                resolve(null);
              })
            }
            onScrollToIndexFailed={info => {
              console.error(info);
            }}
            onStartReachedThreshold={100}
            onEndReachedThreshold={100}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.cachedText}>
            {data.cached ? "Cached data" : "Live data"}
          </Text>
        </>
      ) : null}
    </View>
  );
};

export default RestaurantList;
