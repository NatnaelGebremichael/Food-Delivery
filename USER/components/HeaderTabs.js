import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={tw`flex-row justify-center mt-3`}>
      <HeaderButton
        text="Delivery"
        active={activeTab === "Delivery"}
        onPress={() => setActiveTab("Delivery")}
      />
      <HeaderButton
        text="Pickup"
        active={activeTab === "Pickup"}
        onPress={() => setActiveTab("Pickup")}
      />
    </View>
  );
};

const HeaderButton = ({ text, onPress, active }) => (
  <TouchableOpacity
    style={tw`bg-white px-7 py-2 rounded-full ${active && "bg-black"}`}
    onPress={onPress}
  >
    <Text style={tw`text-black font-bold ${active && "text-white"}`}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default HeaderTabs;
