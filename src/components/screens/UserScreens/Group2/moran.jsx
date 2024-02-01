import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function Moran() {
  const [userLocation, setUserLocation] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: 32.70437090565451,
    longitude: 35.59257737364283,
  });
  const [gravestones, setGravestones] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.0461,
    longitude: 34.8516,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Location permission not granted");
          return;
        }

        //console.log("Watching for location updates...");

        let locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });

            const timestamp = new Date().toLocaleString();

            console.log(
              `Moran:New location at ${timestamp}: Latitude ${location.coords.latitude}, Longitude ${location.coords.longitude}`
            );

            // Update polylineCoordinates with the new user location
            setPolylineCoordinates([
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              destinationCoordinates,
            ]);
          }
        );

        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
            console.log("Location subscription removed");
          }
        };
      } catch (error) {
        console.error("Error getting current location", error);
      }
    };

    getCurrentLocation();
  }, [destinationCoordinates]);

  useEffect(() => {
    // Fetch gravestones from the server
    const fetchGravestones = async () => {
      try {
        //to work - you need to modify the ip that is writen to your ip of the server (the ip of the computer that the server is running on)
        const result = await axios.get(
          "https://us-central1-lcg2-a2c86.cloudfunctions.net/api/api/all"
        );
        //console.log("Gravestones:", result.data);
        setGravestones(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGravestones();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        showsCompass={true}
        showsUserLocation={true}
        //followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : mapRegion.latitude,
          longitude: userLocation
            ? userLocation.longitude
            : mapRegion.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Current Location"
            description="You are here"
            pinColor="blue" // Customize pin color if needed
          />
        )}

        {destinationCoordinates && (
          <Marker
            coordinate={destinationCoordinates}
            title="End"
            description="Destination Point"
            pinColor="red" // Customize pin color if needed
          />
        )}

        {userLocation && destinationCoordinates && (
          <Polyline
            coordinates={[userLocation, destinationCoordinates]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}

        {gravestones.map((gravestone) => (
          <Marker
            key={gravestone._id}
            coordinate={{
              latitude: gravestone.location.latitude,
              longitude: gravestone.location.longitude,
            }}
            title={gravestone.name}
            description={`Cemetery: ${gravestone.cemetery}\nDate of Death: ${gravestone.dateOfDeath}`}
            pinColor="purple"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
