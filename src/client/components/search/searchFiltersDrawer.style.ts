import { StyleSheet } from "react-native";

import { COLORS } from "@/client/constants/theme";

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(14, 14, 14, 0.45)",
  },
  panel: {
    height: "100%",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  panelInner: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  closeHit: {
    padding: 8,
    marginRight: -8,
  },
  closeSymbol: {
    fontSize: 28,
    color: COLORS.gray,
    lineHeight: 32,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

export default styles;
