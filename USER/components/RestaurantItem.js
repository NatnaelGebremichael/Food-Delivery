import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const RestaurantItem = ({ restaurantData }) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("DetailsScreen", {
      item: { ...item },
    });
  };

  return (
    <View>
      {restaurantData?.map((item, index) => (
        <RestaurantItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

export default RestaurantItem;

const RestaurantItemCard = ({ item, onPress }) => {
  const [loved, setLoved] = useState(false);

  return (
    <TouchableOpacity style={tw`mx-4 mb-4`} onPress={onPress}>
      <Image
        source={{ uri: item.image_url }}
        style={tw`w-full h-48 rounded-lg`}
      />
      <TouchableOpacity
        style={tw`absolute top-2 right-2`}
        onPress={() => setLoved((e) => !e)}
      >
        <Entypo
          name={`${loved ? "heart" : "heart-outlined"}`}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
      <View style={tw`flex-row items-center mt-1`}>
        <View style={tw`flex-grow`}>
          <Text style={tw`font-bold text-lg`} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="clock-time-four"
              size={13}
              color="#06C167"
            />
            <Text style={tw`text-xs text-gray-700`}>
              {" "}
              20-30 • min • {item.price}
            </Text>
          </View>
        </View>
        <View
          style={tw`w-8 h-8 justify-center items-center bg-gray-100 rounded-full`}
        >
          <Text style={tw`text-gray-600 text-xs`}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
