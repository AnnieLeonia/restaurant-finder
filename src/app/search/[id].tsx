import * as Location from "expo-location";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { Header, Nav, RestaurantList, SearchBar } from "@/client/components";
import { COLORS, icons } from "@/client/constants";
import styles from "@/client/styles/search";

interface LocationProps {
  lat: number;
  lng: number;
}

const Search = () => {
  const params = useLocalSearchParams();

  const router = useRouter();

  const [isLoadingCoords, setIsLoadingCoords] = useState(false);
  const [location, setLocation] = useState<LocationProps>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsLoadingCoords(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ lat: coords.latitude, lng: coords.longitude });
      setIsLoadingCoords(false);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <SearchBar />
      </Header>

      <View style={styles.view}>
        <Pressable onPress={() => router.back()}>
          <Image source={icons.chevronLeft} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerText}>{params.id}</Text>
        <View>
          {isLoadingCoords ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : location ? (
            <View>
              <RestaurantList
                lat={location.lat}
                lng={location.lng}
                keyword={params.id as string}
              />
            </View>
          ) : (
            <Text>{errorMsg}</Text>
          )}
        </View>
      </View>

      <Nav />
    </SafeAreaView>
  );
};

export default Search;
