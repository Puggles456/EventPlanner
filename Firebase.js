// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import { getAuth, browserLocalPersistence } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNXfKRz8f_xBu8h6LsuUbA6KciD_jTYqg",
  authDomain: "linearbirthday.firebaseapp.com",
  projectId: "linearbirthday",
  storageBucket: "linearbirthday.appspot.com",
  messagingSenderId: "746139014676",
  appId: "1:746139014676:web:5b8e9716459513c5f3f901",
  measurementId: "G-DFZ93LE78K",
};

// Initialize Firebase

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
//export const auth = initializeAuth(firebase, {
//persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//});
export const storage = getStorage(firebase);
