import React from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { CategoryCard, Header, Nav, SearchBar } from '../components';

import { icons } from '../constants';
import styles from '../styles/home';

const categories = [
  { id: '1', title: 'Pizza', image: icons.pizza },
  { id: '2', title: 'Bar', image: icons.bar },
  { id: '3', title: 'Café', image: icons.coffee },
  { id: '4', title: 'Sushi', image: icons.sushi },
  { id: '5', title: 'Hamburgers', image: icons.burger },
  { id: '6', title: 'Asian', image: icons.noodles },
];

const Home = () => {
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard image={item.image} title={item.title} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <Nav />
    </SafeAreaView>
  );
};

export default Home;
