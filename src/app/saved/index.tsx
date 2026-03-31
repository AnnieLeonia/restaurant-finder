import { Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { Header, Nav } from "@/client/components";
import RestaurantItem from "@/client/components/restaurantList/RestaurantItem";
import { useFavorites } from "@/client/context/FavoritesContext";
import styles from "@/client/styles/saved";

function SavedListSeparator() {
  return <View style={styles.separator} />;
}

const Saved = () => {
  const { favorites, ready, toggleFavorite } = useFavorites();
  const { height: windowHeight } = useWindowDimensions();
  const itemHeight = Math.max(320, Math.round(windowHeight * 0.72));

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <Text style={styles.headerText}>Sparat</Text>
      </Header>

      {!ready ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Inga sparade restauranger</Text>
          <Text style={styles.emptyHint}>
            Tryck på hjärtat på en restaurang för att spara den här.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.listFlex}
          data={favorites}
          keyExtractor={item => item.place_id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={SavedListSeparator}
          renderItem={({ item }) => (
            <RestaurantItem
              data={{ ...item, id: `saved-${item.place_id}` }}
              itemHeight={itemHeight}
              isFavorite
              onToggleFavorite={() => toggleFavorite(item)}
            />
          )}
        />
      )}

      <Nav />
    </SafeAreaView>
  );
};

export default Saved;
