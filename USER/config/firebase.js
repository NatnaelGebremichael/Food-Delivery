import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
export const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL,
};
// initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const database = getFirestore();
