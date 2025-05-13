import { StyleSheet } from 'react-native';
import { height, width } from '../../utils/Dimension';
import { colors } from '../../utils/database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 30,
    backgroundColor: colors.green,
  },
  subContainer: {
    // overflow: 'hidden',
    // marginTop: height(2),
    height: height(75),
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderTopEndRadius: 55,
    borderTopLeftRadius: 55
  },
  title: {
    marginTop: height(10),
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.green
  },
  input: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    padding: 10, 
    width: width(85),
    alignSelf: "center"
  },
  registerButton: {
    backgroundColor: colors.green,
    width: width(90),
    height: height(7),
    alignSelf: "center",
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    flexDirection: "row",
    marginTop: 10,

  },
  error: {
    alignSelf: 'flex-end',
    flexDirection: "row",
    paddingHorizontal: 5
  },
  forgotPasswordText: {
    color: 'black',
  },
  loginText: {
    color: colors.green,

    //   fontSize: 18,
    //   fontWeight: 'bold',
  },
  inputContainerView: {
    width: width(85),
    height: height(6),
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
  },
  inputs: {
    width: width(74),
    justifyContent: 'center',
    height: height(6),
    alignSelf: "center",
    fontSize: 14
  },
  btnEye: {
    width: width(9),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
