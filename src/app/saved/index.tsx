import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Header, Nav } from '@/client/components';
import { COLORS } from '@/client/constants';
import styles from '@/client/styles/saved';

const Saved = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header>
        <Text style={styles.headerText}>Saved</Text>
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={{ flex: 1 }}>
          <Text>1 Saved item</Text>
          <Text>2 Saved item</Text>
          <Text>3 Saved item</Text>
          <Text>4 Saved item</Text>
          <Text>5 Saved item</Text>
        </View>
      </ScrollView>

      <Nav />
    </SafeAreaView>
  );
};

export default Saved;
