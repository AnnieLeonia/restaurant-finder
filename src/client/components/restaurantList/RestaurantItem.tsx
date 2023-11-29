import React from "react";
import { Image, Text, View } from "react-native";

import { RestaurantResult } from "@/client//hook/useFetchRestaurant";
import { baseUrl } from "@/client/constants";

export type RestaurantResultItem = RestaurantResult & { id: string };
export const ITEM_HEIGHT = 200;

const RestaurantItem = ({ data }: { data: RestaurantResultItem }) => {
  return (
    <View key={data.id} style={{ height: ITEM_HEIGHT }}>
      <Text>
        {data.name} - {data.id}
      </Text>
      <Text>Rating: {data.rating}</Text>
      <Text>Address: {data.address}</Text>
      {data.open_now !== undefined && (
        <Text>Open Now: {data.open_now ? "Yes" : "No"}</Text>
      )}
      {/* Render other details as needed */}
      {data.photos[0] && (
        <Image
          key={data.id}
          id={data.id}
          alt={data.id}
          source={{ uri: baseUrl + data.photos[0] }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default RestaurantItem;
