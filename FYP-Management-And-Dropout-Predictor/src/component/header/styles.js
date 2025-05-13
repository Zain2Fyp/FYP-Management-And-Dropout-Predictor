import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimension";
import { colors } from "../../utils/database";

export const styles = StyleSheet.create({
  headerView: {
    width: width(100),
    height: height(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
