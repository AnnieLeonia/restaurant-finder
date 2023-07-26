import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileIconWrapper: {
    width: 100,
    height: 100,
    marginTop: 100,
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: 100,
    border: "4px solid #000",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    paddingTop: 50,
    backgroundColor: COLORS.secondary,
  },
  profileInformationContainer: {
    padding: SIZES.small,
    textAlign: "center",
  },
});

export default styles;
