import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  /** Sized to sit inside the shared Header (height 100); avoid marginTop that overflows into ScrollView. */
  profileIconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    padding: SIZES.xSmall,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: COLORS.black,
  },
  profileIcon: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    paddingTop: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  profileInformationContainer: {
    paddingHorizontal: SIZES.large,
    paddingBottom: SIZES.xxLarge,
    gap: SIZES.large,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
  },
  displayName: {
    fontFamily: FONT.bold,
    fontSize: 24,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
  email: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.large,
    gap: SIZES.medium,
  },
  sectionTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.gray,
  },
  bio: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    lineHeight: 24,
    color: COLORS.black,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SIZES.small,
  },
  statBlock: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.tertiary,
  },
  statLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: 4,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.small,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray,
  },
  fieldRowLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  fieldValue: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.black,
    flex: 1,
    textAlign: "right",
    marginLeft: SIZES.medium,
  },
});

export default styles;
