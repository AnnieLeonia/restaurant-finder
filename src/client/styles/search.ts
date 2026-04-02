import { StyleSheet } from "react-native";

import { COLORS, FONT } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  view: {
    flex: 1,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 8,
    marginBottom: 4,
    minHeight: 50,
  },
  /** Same width so the middle “Slumpa” stays visually centered. */
  toolbarSlotStart: {
    width: 56,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  toolbarSlotEnd: {
    width: 56,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  toolbarCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  toolbarIconHit: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shuffleButton: {
    paddingTop: 4,
    paddingBottom: 0,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  shuffleButtonText: {
    fontFamily: FONT.medium,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.tertiary,
  },
  searchKeywordText: {
    fontFamily: FONT.bold,
    fontSize: 20,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 0,
    paddingHorizontal: 4,
    maxWidth: "100%",
  },
  filterIcon: {
    width: 50,
    height: 50,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  button: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tertiary,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.white,
  },
  errorText: {
    color: "#C0392B",
    marginBottom: 8,
  },
  listArea: {
    flex: 1,
    minHeight: 200,
  },
});

export default styles;
