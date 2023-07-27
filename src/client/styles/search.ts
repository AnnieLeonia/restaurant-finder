import { StyleSheet } from "react-native";

import { COLORS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: 20,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
