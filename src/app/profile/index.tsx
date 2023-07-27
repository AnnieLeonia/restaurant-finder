import { Stack, useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Header, Nav } from "@/client/components";
import { icons } from "@/client/constants";
import styles from "@/client/styles/profile";

const Profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <View style={styles.profileIconWrapper}>
          <Image
            source={icons.profile}
            resizeMode="contain"
            style={styles.profileIcon}
          />
        </View>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.profileInformationContainer}>
          <Text>This is the your profile page!</Text>
        </View>
      </ScrollView>

      <Nav />
    </SafeAreaView>
  );
};

export default Profile;
