import { StyleSheet } from "react-native";
import { width } from "../../utils/Dimension";

export const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "red",
    width: width(100),
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 30,
    elevation: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
