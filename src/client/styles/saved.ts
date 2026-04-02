import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: SIZES.large,
  },
  listFlex: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.small,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.large,
  },
  emptyTitle: {
    fontSize: SIZES.large,
    fontWeight: "600",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: SIZES.small,
  },
  emptyHint: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 22,
  },
  separator: {
    height: SIZES.medium,
  },
});

export default styles;
