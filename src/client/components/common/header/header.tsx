import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import styles from "./header.style";

const Header = ({ children }: any) => {
  const router = useRouter();

  return <View style={styles.container}>{children}</View>;
};

export default Header;
