import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import useFetchRestaurant, {
  RestaurantRequestProps,
} from "@/client//hook/useFetchRestaurant";
import { COLORS } from "@/client/constants";

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

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <ScrollView>
            {data?.map((item, index) => (
              <Text key={index}>{item.name}</Text>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default RestaurantList;
