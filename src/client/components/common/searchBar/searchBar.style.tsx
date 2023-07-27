import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "@/client/constants";

const styles = StyleSheet.create<any>({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    height: 100,
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    marginLeft: SIZES.small,
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    flex: 1,
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 40,
    height: "100%",
    justifyContent: "center",
  },
  searchIcon: {
    width: "80%",
    height: "80%",
  },
});

export default styles;
