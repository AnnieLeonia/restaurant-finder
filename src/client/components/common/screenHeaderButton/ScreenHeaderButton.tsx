import React from "react";
import { Image, ImageSourcePropType, Pressable } from "react-native";

import styles from "./screenHeaderButton.style";

interface ScreenHeaderBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress?: () => void;
}

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  handlePress,
}: ScreenHeaderBtnProps) => {
  return (
    <Pressable style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </Pressable>
  );
};

export default ScreenHeaderBtn;
