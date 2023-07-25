import React from 'react';
import { Image, Text, SafeAreaView, ScrollView, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Header, Nav, SearchBar } from '../../components';

import { COLORS, icons } from '../../constants';
import styles from '../../styles/profile';

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
            resizeMode='contain'
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
