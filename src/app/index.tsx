import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";

import { CategoryCard, Header, Nav, SearchBar } from "@/client/components";
import { icons } from "@/client/constants";
import styles from "@/client/styles/home";

const categories = [
  { id: "1", title: "pizza", image: icons.pizza },
  { id: "2", title: "bar", image: icons.bar },
  { id: "3", title: "café", image: icons.coffee },
  { id: "4", title: "sushi", image: icons.sushi },
  { id: "5", title: "hamburgers", image: icons.burger },
  { id: "6", title: "asian", image: icons.noodles },
];

const Home = () => {
  const router = useRouter();

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

      <View style={styles.categoryList}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryCard
              image={item.image}
              title={item.title}
              handleCardPress={() => router.push(`/search/${item.title}`)}
            />
          )}
          numColumns={2}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Nav />
    </SafeAreaView>
  );
};

export default Home;
