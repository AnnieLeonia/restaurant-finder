import { StyleSheet } from "react-native";

import { COLORS } from "@/client/constants/theme";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textTransform: "uppercase",
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  chipActive: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
  },
  chipText: {
    color: COLORS.black,
    fontSize: 14,
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  hint: {
    fontSize: 12,
    color: COLORS.gray,
  },
  sliderBlock: {
    paddingVertical: 4,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderTicks: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tickLabel: {
    fontSize: 11,
    color: COLORS.gray,
  },
});

export default styles;
