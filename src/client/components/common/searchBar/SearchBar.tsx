import React from "react";
import { Image, Pressable, TextInput, View } from "react-native";

import { icons } from "@/client/constants";

import styles from "./searchBar.style";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            // value={searchTerm}
            // onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
          <Pressable style={styles.searchBtn} /*onPress={handleClick}*/>
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
