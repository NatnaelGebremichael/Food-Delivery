import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import ChooseOrginDestination from "../components/ChooseOrginDestination";
import RideOptions from "../components/RideOptions";

const RideMapScreen = () => {
  const Stack = createStackNavigator(); //creating stack navigator inside another stack
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map /* The google map view*/ />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChooseOrginDestination" /* This Stack let us choose origin and destination*/
            component={ChooseOrginDestination}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptions" /* This Stack lets us choose ride/type of car */
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default RideMapScreen;

const styles = StyleSheet.create({});
