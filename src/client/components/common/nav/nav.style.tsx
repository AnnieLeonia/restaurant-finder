import { StyleSheet } from "react-native";

import { COLORS } from "@/client/constants";

const styles = StyleSheet.create<any>({
  container: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: COLORS.white,
  },
  navBtn: {
    alignItems: "center",
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;
