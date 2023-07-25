import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Header, Nav, SearchBar } from '../components';

import { COLORS } from '../constants';
import styles from '../styles/home';

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
          <Text>This is the home page!</Text>
        </View>
      </ScrollView>

      <Nav />
    </SafeAreaView>
  );
};

export default Home;
