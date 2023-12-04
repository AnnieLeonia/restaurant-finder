import React from "react";
import { Image, Text, View } from "react-native";

import { baseUrl } from "@/client/constants";
import { Restaurant } from "@/common/types";

export type RestaurantItemType = Restaurant & { id: string };
export const ITEM_HEIGHT = 200;

const RestaurantItem = ({ data }: { data: RestaurantItemType }) => {
  return (
    <View key={data.id} style={{ height: ITEM_HEIGHT }}>
      <Text>{data.name}</Text>
      <Text>
        Rating: {data.rating} ({data.reviews})
      </Text>
      <Text>Address: {data.address}</Text>
      <Text>
        Distance: {data.distance.meters}m ({data.distance.minutes}min)
      </Text>
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
