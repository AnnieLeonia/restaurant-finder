import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import useFetchRestaurant, {
  RestaurantRequestProps,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";
import useScrollToRandom from "@/client/hook/useScrollToRandom";
import { generateUniqueKey } from "@/common/utils";

import RestaurantItem, {
  ITEM_HEIGHT,
  RestaurantItemType,
} from "./RestaurantItem";
import styles from "./restaurantList.style";

const RestaurantList = (props: RestaurantRequestProps) => {
  const { data, isLoading, error } = useFetchRestaurant(props);

  const restaurants = useMemo(
    () =>
      data
        .filter(restaurant => restaurant.open_now)
        .filter(restaurant => restaurant.distance.minutes < 30)
        .filter(restaurant => restaurant.rating > 4),
    [data],
  );
  const [listItems, setListItems] = useState<RestaurantItemType[]>([]);
  const [ref, scrollToRandom] = useScrollToRandom();

  useEffect(() => {
    const looped = Array.from({ length: 10 }, () => restaurants).flat();
    looped.sort(() => Math.random() - 0.5);
    setListItems(looped.map(item => ({ ...item, id: generateUniqueKey() })));
  }, [restaurants]);

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : restaurants.length > 0 && listItems.length > 0 ? (
          <View style={{ width: "100%", height: 1000 }}>
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
                    restaurants
                      .map(item => ({ ...item, id: generateUniqueKey() }))
                      .concat(prev.slice(0, -restaurants.length)),
                  );
                  resolve(null);
                })
              }
              onEndReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    prev.slice(restaurants.length).concat(
                      restaurants.map(item => ({
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
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default RestaurantList;
