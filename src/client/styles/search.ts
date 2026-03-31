import { StyleSheet } from "react-native";

import { COLORS } from "../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  view: {
    flex: 1,
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: 20,
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
  locationBlock: {
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.gray,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  locationButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.tertiary,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  addressHint: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.gray,
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
