import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "@/client/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  cachedText: {
    fontStyle: "italic",
  },
  cachedOverlayWrap: {
    position: "absolute",
    bottom: SIZES.small,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  cachedOverlay: {
    fontSize: 11,
    color: COLORS.gray,
    fontStyle: "italic",
  },
  card: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: COLORS.secondary,
  },
  heroImage: {
    width: "100%",
    backgroundColor: COLORS.primary,
  },
  heroPlaceholder: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  placeholderText: {
    color: COLORS.gray,
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
  },
  bodyScroll: {
    flex: 1,
  },
  bodyScrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.large,
    paddingBottom: SIZES.medium,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: SIZES.medium,
  },
  rating: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginRight: SIZES.small,
  },
  reviews: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
  },
  statusOpen: {
    backgroundColor: "rgba(94, 167, 139, 0.2)",
  },
  statusClosed: {
    backgroundColor: "rgba(192, 57, 43, 0.12)",
  },
  statusText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SIZES.small,
  },
  rowFirst: {
    marginTop: SIZES.large,
  },
  rowLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.gray,
    width: 100,
  },
  rowValue: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  mapsHint: {
    marginTop: SIZES.large,
    paddingTop: SIZES.medium,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontStyle: "italic",
  },
});

export default styles;
