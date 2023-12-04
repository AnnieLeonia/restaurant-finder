import React from "react";
import { Image, Linking, Pressable, Text } from "react-native";

import { baseUrl } from "@/client/constants";
import { Restaurant } from "@/common/types";

export type RestaurantItemType = Restaurant & { id: string };
export const ITEM_HEIGHT = 200;

const mapsUrl = (data: Restaurant) =>
  `https://www.google.com/maps/search/?api=1&query=${data.name} ${data.address}&query_place_id=${data.place_id}`;

const RestaurantItem = ({ data }: { data: RestaurantItemType }) => {
  return (
    <Pressable
      key={data.id}
      onPress={() => Linking.openURL(mapsUrl(data))}
      style={{ height: ITEM_HEIGHT }}
    >
      <Text>{data.name}</Text>
      <Text>
        Rating: {data.rating} ({data.reviews})
      </Text>
      <Text>Address: {data.address}</Text>
      <Text>
        Distance: {data.distance.meters}m ({data.distance.minutes}min)
      </Text>
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
    </Pressable>
  );
};

export default RestaurantItem;
