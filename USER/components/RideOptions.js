import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  selectDestination,
  selectTravelTimeInformation,
} from "../slices/navSlices";
import tw from "twrnc";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icon, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "uber-x-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "uber-xl-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "uber-x-457",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const Surge_Charge_Rate = 1.5;

const RideOptions = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity //back button/arrow
          onPress={() => navigation.navigate("ChooseOrginDestination")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text //select ride prompt
          style={tw`text-center py-5 text-xl`}
        >
          Select Ride - {travelTimeInformation?.distance?.text}{" "}
        </Text>
      </View>
      <FlatList //display types of cars available
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} travel Time</Text>
            </View>
            <Text style={tw`text-xl items-end `}>
              {(travelTimeInformation?.duration?.value *
                Surge_Charge_Rate *
                multiplier) /
                100}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View //choose button
        style={tw`mt-auto border-t border-gray-200`}
      >
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptions;

const styles = StyleSheet.create({});
