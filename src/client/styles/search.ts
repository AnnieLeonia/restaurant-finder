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
