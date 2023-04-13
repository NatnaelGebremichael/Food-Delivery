import { View, Text, StyleSheet } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hurray!!, we are on the welcome screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#aaa",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
