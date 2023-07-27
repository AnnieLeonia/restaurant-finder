import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import styles from "./categoryCard.style";

interface CategoryCardProps {
  image: ImageSourcePropType;
  title: string;
}

const CategoryCard = ({ image, title }: CategoryCardProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.cardImageWrapper}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

export default CategoryCard;
