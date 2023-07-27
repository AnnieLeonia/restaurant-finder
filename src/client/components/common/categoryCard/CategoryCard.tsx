import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

import styles from "./categoryCard.style";

interface CategoryCardProps {
  image: ImageSourcePropType;
  title: string;
  handleCardPress: () => void;
}

const CategoryCard = ({ image, title, handleCardPress }: CategoryCardProps) => {
  return (
    <Pressable style={styles.container} onPress={() => handleCardPress()}>
      <View style={styles.cardImageWrapper}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </Pressable>
  );
};

export default CategoryCard;
