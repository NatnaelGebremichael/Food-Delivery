import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigion } from "../slices/navSlices";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "RideScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen", //change in the future
  },
];

const RideOrFoodNav = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          //disabled={!origin}
        >
          <View
          //style={tw`${!origin && "opacity-20"}`}
          >
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            ></Image>
            <Text style={tw`mt-2 text-lg font-semibold`}> {item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              type="antdesign"
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default RideOrFoodNav;
