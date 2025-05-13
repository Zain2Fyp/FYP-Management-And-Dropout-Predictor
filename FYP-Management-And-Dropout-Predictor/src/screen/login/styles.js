import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimension";
import { colors } from "../../utils/database";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //paddingHorizontal: 30,
    backgroundColor: colors.green,
  },
  subContainer: {
    //marginTop: height(2),
    //overflow: 'hidden',
    height: height(70),
    justifyContent: "center",
    //alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderTopEndRadius: 55,
    borderTopLeftRadius: 55,
  },
  title: {
    marginTop: height(15),
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 3,
    marginTop: 20,
  },

  label: {
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.green,
  },
  inputContainerView: {
    width: width(85),
    height: height(6),
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
  },
  input: {
    width: width(70),
    justifyContent: "center",
    height: height(5),
    //alignSelf: "center",
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  forgotPasswordText: {
    color: colors.green,
  },
  loginButton: {
    backgroundColor: colors.green,
    width: width(90),
    height: height(7),
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    elevation: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnText: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "#fff",
    width: width(90),
    height: height(7),
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    elevation: 10,
  },
  signupButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: 7,
  },
  btnEye: {
    width: width(10),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
