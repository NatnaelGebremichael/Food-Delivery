import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RideOrFoodNav from "../components/RideOrFoodNav";

const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[tw`bg-white h-full`]}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <RideOrFoodNav />
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={styles.chatButton}
        >
          <Entypo name="chat" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});

const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
