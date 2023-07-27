import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, Text } from "react-native";

import { Header } from "@/client/components";
import { icons } from "@/client/constants";
import styles from "@/client/styles/search";

const Search = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <Text style={styles.headerText}>{params.id}</Text>
      </Header>
      <Pressable onPress={() => router.back()}>
        <Image
          source={icons.chevronLeft}
          resizeMode="contain"
          style={styles.backIcon}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Search;
