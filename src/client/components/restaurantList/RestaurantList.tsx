import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

import useFetchRestaurant, {
  RestaurantRequestProps,
  RestaurantResult,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";

import styles from "./restaurantList.style";

export const generateUniqueKey = () =>
  `_${Math.random().toString(36).substr(2, 9)}`;

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

  const [listItems, setListItems] = useState<
    (RestaurantResult & { id: string })[]
  >([]);

  useEffect(() => {
    setListItems(data.map(item => ({ ...item, id: generateUniqueKey() })));
  }, [data]);

  console.log("listItems", listItems);

  console.log("data", data);

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View style={{ width: 500, height: 500 }}>
            <FlatList
              data={listItems}
              renderItem={({ item }) => (
                <Text key={item.id} style={{ fontSize: 50 }}>
                  {item.name}
                </Text>
              )}
              onStartReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    data
                      .map(item => ({ ...item, id: generateUniqueKey() }))
                      .concat(prev),
                  );
                  resolve();
                })
              }
              onEndReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    prev.concat(
                      data.map(item => ({ ...item, id: generateUniqueKey() })),
                    ),
                  );
                  resolve();
                })
              }
              showDefaultLoadingIndicators={true}
              onStartReachedThreshold={1000}
              onEndReachedThreshold={1000}
              // showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RestaurantList;
