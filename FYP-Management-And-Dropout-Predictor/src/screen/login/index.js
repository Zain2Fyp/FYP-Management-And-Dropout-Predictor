import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../../route/routes';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import MenuItemComponent from '../../component/menuItem';
import Button from '../../component/button';
import { ScreenWrapper } from 'react-native-screen-wrapper'
import { doc, getDoc } from "firebase/firestore";
import { Entypo } from 'react-native-vector-icons'

export default function Login() {
  const navigation = useNavigation()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState("");
  const [send, setSend] = useState("");
  const [eye, setToggleEye] = useState("");
  const [selectedOption, setSelectedOption] = useState('Select Option')

  const handleLogin = async () => {
    console.log("handleLogin triggered");
    console.log("Selected Option:", selectedOption);

    if (selectedOption === 'Select Option') {
      Alert.alert("Option Error", "Please Select an Option");
      return;
    }

    const docRef = doc(db, "SelectedUser", selectedOption, email, "UserData");
    console.log("Document Reference Path:---", docRef.path);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document Data:", data);

        if (data && email === data?.email) {
          signInFuction();
        } else {
          Alert.alert("Login Error", "No Record Found");
        }
      } else {
        Alert.alert("Login Error", "No Record Found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const signInFuction = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {

          navigation.navigate(ScreenNames.HOME, { Option: selectedOption })
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let customErrorMessage = "";
        if (errorCode == "auth/user-not-found") {
          customErrorMessage = "User not found.\n  Please check your email.";
        } else if (errorCode == "auth/wrong-password") {
          customErrorMessage = "Incorrect password.\n  Please try again.";
        } else if (errorCode == "auth/invalid-email") {
          customErrorMessage = "Invalid-email.\n  Please try again.";
        } else if (errorCode == "auth/invalid-credential") {
          customErrorMessage =
            "Invalid Email or Password.\n  Please try again.";
        } else if (errorCode == "auth/network-request-failed") {
          customErrorMessage = "Network-request-failed.\n Please try again.";
        } else if (errorCode == "auth/weak-password") {
          customErrorMessage =
            "Weak password! \n Password should be at least 6 Characters.";
        } else if (errorCode == "auth/missing-password") {
          customErrorMessage = "Missing password! \n Please write password";
        } else if (errorCode == "auth/missing-email") {
          customErrorMessage = "Missing email! \n Please write email";
        } else {
          customErrorMessage = errorMessage;
        }
        setError(customErrorMessage)
        setTimeout(() => {
          setError("");
        }, 1000);
      });
  }

  const handleForgetPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setSend("Email has been send Successfully");
          setTimeout(() => {
            setSend("");
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          setTimeout(() => {
            setError("");
          }, 1000);
        });
    } else {
      setError("Please enter valid email");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };
  return (
    <ScreenWrapper scrollType='keyboard' scrollViewProps={{
      showsVerticalScrollIndicator: false
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>Wellcome To Our App</Text>
        <Text style={styles.subtitle}>This will provide Dropout Prediction & FYP Management</Text>
        <MenuItemComponent setState={(i) => setSelectedOption(i)} />
        <View style={styles.subContainer}>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainerView}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                autoCapitalize="none"
                onChangeText={(e) => setEmail(e)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainerView, { flexDirection: 'row', justifyContent: 'space-between', }]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={eye ? false : true}
                onChangeText={(p) => setPassword(p)}
              />
              <TouchableOpacity onPress={() => setToggleEye(!eye)} style={styles.btnEye}>
                <Entypo name={eye ? 'eye' : 'eye-with-line'} size={20} color={'green'} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity> */}

          <Button title='Login' style={styles.loginButton} onPress={handleLogin} />
          <Button title='Register' textStyle={styles.btnText} style={styles.signupButton} onPress={() => navigation.navigate(ScreenNames.SIGNUP)} />


          <View style={styles.error}>
            <Text
              style={{
                alignItems: "flex-end",
                color: "red",
                textAlign: "right",
                fontSize: 13,
              }}
            >
              {Error}
            </Text>
            {send != "" && <Text style={{ alignItems: "flex-end", textAlign: "right", fontSize: 13, color: "green" }}>{send}</Text>}

          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
