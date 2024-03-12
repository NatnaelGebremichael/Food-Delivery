import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import colors from "../configs/colors";
import { auth } from "../config/firebase";
import Screen from "../components/Screen";
import { signInWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tw`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Login to Uber <Text style={styles.brand}>Eats</Text>
        </Text>
        <View style={styles.form} />
        <SafeAreaView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text style={styles.Login}>Log In</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Otp")}>
              <Text
                style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}
              >
                {" "}
                Otp
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: 23,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "color: #56af57",
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 16,
    textAlign: "center",
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#000000",
    height: 58,
    borderRadius: 10,
    color: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  Login: {
    fontSize: 18,
    color: "#56af57",
    textAlign: "center",
    fontWeight: "500",
  },
});
