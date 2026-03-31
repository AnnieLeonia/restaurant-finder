import { Stack } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Header, Nav } from "@/client/components";
import { icons } from "@/client/constants";
import styles from "@/client/styles/profile";

/** Placeholder profile content for UI development. */
const FAKE_PROFILE = {
  name: "Anna Andersson",
  email: "anna.andersson@example.com",
  bio: "Jag älskar att upptäcka nya kvarterskrogar och testa menyer med lokala råvaror. Helst italienskt eller koreanskt på helgerna.",
  city: "Stockholm",
  favoriteCuisine: "Italienskt",
  memberSince: "mars 2024",
  visitsLogged: 42,
  reviewsWritten: 12,
};

const Profile = () => {
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
          <View style={styles.profileHeader}>
            <Text style={styles.displayName}>{FAKE_PROFILE.name}</Text>
            <Text style={styles.email}>{FAKE_PROFILE.email}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Om mig</Text>
            <Text style={styles.bio}>{FAKE_PROFILE.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aktivitet</Text>
            <View style={styles.statRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statValue}>
                  {FAKE_PROFILE.visitsLogged}
                </Text>
                <Text style={styles.statLabel}>besök loggade</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statValue}>
                  {FAKE_PROFILE.reviewsWritten}
                </Text>
                <Text style={styles.statLabel}>recensioner</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Konto</Text>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Stad</Text>
              <Text style={styles.fieldValue}>{FAKE_PROFILE.city}</Text>
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Favoritkök</Text>
              <Text style={styles.fieldValue}>
                {FAKE_PROFILE.favoriteCuisine}
              </Text>
            </View>
            <View style={[styles.fieldRow, styles.fieldRowLast]}>
              <Text style={styles.fieldLabel}>Medlem sedan</Text>
              <Text style={styles.fieldValue}>{FAKE_PROFILE.memberSince}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Nav />
    </SafeAreaView>
  );
};

export default Profile;
