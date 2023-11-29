import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import useFetchRestaurant, {
  RestaurantRequestProps,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";
import useScrollToRandom from "@/client/hook/useScrollToRandom";
import { generateUniqueKey } from "@/common/utils";

import RestaurantItem, {
  ITEM_HEIGHT,
  RestaurantResultItem,
} from "./RestaurantItem";
import styles from "./restaurantList.style";

const RestaurantList = ({
  lat,
  lng,
  keyword,
  distance,
}: RestaurantRequestProps) => {
  const { data, isLoading, error } = useFetchRestaurant({
    lat,
    lng,
    keyword,
    distance,
  });

  const [listItems, setListItems] = useState<RestaurantResultItem[]>([]);
  const [ref, scrollToRandom] = useScrollToRandom();

  useEffect(() => {
    const looped = Array.from({ length: 10 }, () => data).flat();
    looped.sort(() => Math.random() - 0.5);
    setListItems(looped.map(item => ({ ...item, id: generateUniqueKey() })));
  }, [data]);

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : data.length > 0 && listItems.length > 0 ? (
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
                scrollToRandom(data.length);
              }}
              onStartReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    data
                      .map(item => ({ ...item, id: generateUniqueKey() }))
                      .concat(prev.slice(0, -data.length)),
                  );
                  resolve(null);
                })
              }
              onEndReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    prev.slice(data.length).concat(
                      data.map(item => ({
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
