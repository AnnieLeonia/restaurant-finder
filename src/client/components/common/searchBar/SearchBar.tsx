import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";

import { icons } from "@/client/constants";

import styles from "./searchBar.style";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            onSubmitEditing={() => router.push(`/search/${searchTerm}`)}
            placeholder="What are you looking for?"
          />
          <Pressable
            style={styles.searchBtn}
            onPress={() => router.push(`/search/${searchTerm}`)}
          >
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
