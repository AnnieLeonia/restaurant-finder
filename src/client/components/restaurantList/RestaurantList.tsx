import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import useFetchRestaurant, {
  RestaurantRequestProps,
  RestaurantResult,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";

import styles from "./restaurantList.style";

const RestaurantItem = ({ data }: { data: RestaurantResult }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{data.name}</Text>
      <Text>Rating: {data.rating}</Text>
      <Text>Address: {data.address}</Text>
      {data.open_now !== undefined && (
        <Text>Open Now: {data.open_now ? "Yes" : "No"}</Text>
      )}
      {/* Render other details as needed */}
      <Image
        source={{ uri: data.photos[0] }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

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
                <RestaurantItem key={item.id} data={item} />
              )}
              onStartReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    data
                      .map(item => ({ ...item, id: generateUniqueKey() }))
                      .concat(prev),
                  );
                  resolve(null);
                })
              }
              onEndReached={() =>
                new Promise(resolve => {
                  setListItems(prev =>
                    prev.concat(
                      data.map(item => ({ ...item, id: generateUniqueKey() })),
                    ),
                  );
                  resolve(null);
                })
              }
              // showDefaultLoadingIndicators={true}
              onStartReachedThreshold={1000}
              onEndReachedThreshold={1000}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RestaurantList;
