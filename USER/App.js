import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
//import { onAuthStateChanged } from "firebase/app";
import { Provider } from "react-redux";
import { auth } from "./config/firebase";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import { store } from "./store";
import RideScreen from "./screens/RideScreen";
import EatsScreen from "./screens/EatsScreen";
import Otp from "./screens/Otp";
import WelcomeScreen from "./screens/Welcome";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AppStack() {
  return (
    <Provider store={store}>
      <Stack.Navigator defaultScreenOptions={{ Home }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen
          name="RideScreen"
          component={RideScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EatsScreen" component={EatsScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
