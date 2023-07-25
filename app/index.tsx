import { useState } from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { ScreenHeaderButton } from '../components';

import { icons } from '../constants';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'wheat',
          },
          headerLeft: () => (
            <ScreenHeaderButton iconUrl={icons.menu} dimension='60%' />
          ),
          headerShadowVisible: true,
          headerTitle: 'Home',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Text>This is the home page!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
