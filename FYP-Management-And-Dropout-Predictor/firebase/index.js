// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6dXHlLPH1JGLv4QxSpuVzwQ5Whbz6Yls",
  authDomain: "studentdropoutprediction.firebaseapp.com",
  projectId: "studentdropoutprediction",
  storageBucket: "studentdropoutprediction.firebasestorage.app",
  messagingSenderId: "776873439003",
  appId: "1:776873439003:web:a66f701cb58709aa7c2dbe",
  measurementId: "G-HS0J968JYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app)
const db = getFirestore(app);
const database = getDatabase(app)
export { auth }
export { db }
export { storage }
export { database }