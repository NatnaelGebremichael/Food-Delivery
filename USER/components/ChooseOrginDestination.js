import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  selectDestination,
  selectOrigion,
  setDestination,
  setOrigin,
} from "../slices/navSlices";
import tw from "twrnc";
import React from "react";
import Constants from "expo-constants";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ChooseOrginDestination = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigion);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Nati</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View //select origin and destination
        >
          <GooglePlacesAutocomplete //select origin [default current location]
            placeholder="Where From?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400} //will execute search after 400ms
            styles={inputBoxStyles}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: Constants.manifest.extra.googleMapsApikey,
              language: "en",
            }}
          />
          <GooglePlacesAutocomplete //select destination
            placeholder="Where to?"
            styles={inputBoxStyles}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              {
                origin != null ? navigation.navigate("RideOptions") : "";
              }
            }}
            enablePoweredByContainer={false}
            query={{
              key: Constants.manifest.extra.googleMapsApikey,
              language: "en",
            }}
            nearbyPlacesAPI="GoogleplacesSearch"
            debounce={400}
          />
        </View>
        <View //ride button
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 pt-30`}
        >
          <TouchableOpacity //Ride button
            disabled={!destination}
            onPress={() => navigation.navigate("RideOptions")}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full   ${
              !destination && "opacity-20"
            }`}
          >
            <Icon name="car-outline" type="ionicon" color="white" size={16} />
            <Text
              style={tw`text-white text-center ${!destination && "text-black"}`}
            >
              Rides
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseOrginDestination;

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
