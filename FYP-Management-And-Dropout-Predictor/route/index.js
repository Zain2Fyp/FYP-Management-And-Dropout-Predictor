import { View, Text, AppState } from "react-native";
import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import Login from "../src/screen/login"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenNames from "./routes";
import Register from "../src/screen/signup";
// import Home from "../src/screen/home";

import { auth, db } from "../firebase";
import Home from "../src/screen/home";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();



export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth.currentUser ? ScreenNames.HOME : ScreenNames.LOGIN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ScreenNames.LOGIN} component={Login} />
        <Stack.Screen name={ScreenNames.SIGNUP} component={Register} />
        <Stack.Screen name={ScreenNames.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
