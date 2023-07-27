import React from "react";
import { ScrollView, Text, View } from "react-native";

import useFetchRestaurant from "@/client//hook/useFetchRestaurant";

import styles from "./restaurantList.style";

const RestaurantList = () => {
  const { data, isLoading, error } = useFetchRestaurant();

  return (
    <View style={styles.container}>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
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
