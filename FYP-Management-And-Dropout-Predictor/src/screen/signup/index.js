import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../../route/routes';
import { auth, db } from '../../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import MenuItemComponent from '../../component/menuItem';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import { Entypo } from 'react-native-vector-icons'


export default function Register() {
  const navigation = useNavigation()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState('Select Option')
  const [eye, setToggleEye] = useState("");
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password not matched");
      return
    }
    if (selectedOption === 'Select Option') {
      Alert.alert("Option Error", "Please Select an Option");
      return
    }
    try {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up

          const user = userCredential.user;
          console.log("User", user);
          if (user) {

            setId(user.uid);
            SaveListData()
            AddUserData(id, Username, email);
            console.log("register User", user.uid);
            navigation.navigate(ScreenNames.LOGIN)
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
          setError(customErrorMessage);
        });

    } catch (error) {
      console.log("error", error);
    }
  };
  const SaveListData = async () => {
    try {


      const usersCollectionRef = collection(db, selectedOption);

      await addDoc(usersCollectionRef, {
        username: Username,
        email: email,
        id: auth.currentUser.uid,
      });

      console.log("Data saved successfully!");

    } catch (e) {
      console.error("Error saving document: ", e);
    }
  };

  const AddUserData = async () => {
    try {
      const userRef = doc(db, "SelectedUser", selectedOption, auth.currentUser.email, "UserData");
      await setDoc(userRef, {
        username: Username,
        email: email,
        id: auth.currentUser.uid,
      });
      await updateProfile(auth?.currentUser, {
        displayName: Username,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <ScreenWrapper scrollType='keyboard' scrollViewProps={{
      showsVerticalScrollIndicator: false
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up Now</Text>
        <Text style={styles.subtitle}>Please fill the details to create account</Text>
        <MenuItemComponent setState={(i) => setSelectedOption(i)} />


        <View style={styles.subContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              autoCapitalize="words"
              onChangeText={(e) => setUserName(e)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(e) => setEmail(e)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainerView, { flexDirection: 'row', justifyContent: 'space-between', }]}>
              <TextInput
                style={styles.inputs}
                placeholder="Enter your password"
                onChangeText={(p) => setPassword(p)}
                secureTextEntry={eye ? false : true}
              />
              <TouchableOpacity onPress={() => setToggleEye(!eye)} style={styles.btnEye}>
                <Entypo name={eye ? 'eye' : 'eye-with-line'} size={20} color={'green'} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={[styles.inputContainerView, { flexDirection: 'row', justifyContent: 'space-between', }]}>
              <TextInput
                style={styles.inputs}
                placeholder="Confirm your password"
                onChangeText={(p) => setConfirmPassword(p)}
                secureTextEntry={eye ? false : true}
              />
              <TouchableOpacity onPress={() => setToggleEye(!eye)} style={styles.btnEye}>
                <Entypo name={eye ? 'eye' : 'eye-with-line'} size={20} color={'green'} />
              </TouchableOpacity>
            </View>

          </View>
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
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
