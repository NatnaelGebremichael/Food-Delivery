import {
  selectDestination,
  selectOrigion,
  setTravelTimeInformation,
} from "../slices/navSlices";
import tw from "twrnc";
import { Image } from "@rneui/themed";
import Constants from "expo-constants";
import * as Location from "expo-location";
import cars from "../assets/data/cars.js";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const origin = useSelector(selectOrigion);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null); //pointer (this can be pointed at anything) we use it to point to "map"

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      //get travelTimeInformation
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${Constants.manifest.extra.googleMapsApikey}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
        .catch(function (error) {
          console.log(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    };
    getTravelTime();
  }, [origin, destination, Constants.manifest.extra.googleMapsApikey]);

  const getCarImage = (type) => {
    //return correct car.png
    if (type === "UberX") {
      return require("../assets/images/top-UberX.png");
    }
    if (type === "Comfort") {
      return require("../assets/images/top-Comfort.png");
    }
    if (type === "UberXL") {
      return require("../assets/images/top-UberXL.png");
    }
  };

  const [currentLocationLat, setCurrentLocationLat] = useState({});
  const [currentLocationLong, setcurrentLocationLong] = useState({});
  useEffect(() => {
    //get current  location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      const loc = await Location.getCurrentPositionAsync();
      setCurrentLocationLat(loc.coords.latitude);
      setcurrentLocationLong(loc.coords.longitude);
    })().catch(function (error) {
      console.log("There has been a problem: " + error.message);
    });
  }, []);

  return (
    <MapView //display map
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard" //removes unnesscery details from map
      initialRegion={{
        latitude: origin === null ? 28.450627 : origin.location.lat,
        longitude: origin === null ? -16.263045 : origin.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0121,
      }}
    >
      {console.log(JSON.stringify(currentLocationLat))}

      {origin &&
        destination && ( //display line from origin to destination
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={Constants.manifest.extra.googleMapsApikey}
            strokeWidth={3}
            strokeColor="black"
          />
        )}

      {destination?.location /**allows us to put pin on destination location */ && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="destination"
          description={destination.description}
          identifier="destination"
        />
      )}

      <Marker /**allows us to put pin on  origin location */
        coordinate={{
          latitude: origin === null ? 28.450627 : origin.location.lat,
          longitude: origin === null ? -16.263045 : origin.location.lng,
        }}
        title="origin"
        description={
          origin === null ? "Victoria University" : origin.description
        }
        identifier="origin"
      />

      {cars.map((car) => (
        <Marker /**Display Icons for available cars on the map */
          key={car.id}
          coordinate={{
            latitude: car.latitude,
            longitude: car.longitude,
          }}
          title="catTest1"
          description="test-Car1"
          identifier="catTest1"
        >
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              transform: [
                // allows for display of car in the direction they are going
                {
                  rotate: `${car.heading}90deg`,
                },
              ],
            }}
            source={getCarImage(car.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
