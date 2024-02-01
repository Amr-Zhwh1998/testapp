import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

export default function DirectorComponent() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [locationSet, setLocationSet] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLocationSet(true);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (startPressed && initialRegion) {
      setStartPoint({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      });
    }
  }, [startPressed, initialRegion]);

  const handleStartPress = () => {
    setStartPressed(true);
  };

  const handleEndPress = () => {
    if (initialRegion) {
      setEndPoint({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude ,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {startPressed && startPoint && endPoint && (
          <Polyline
            coordinates={[startPoint, endPoint]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}
        {startPressed && startPoint && (
          <Marker coordinate={startPoint} title="Starting Point" />
        )}
        {startPressed && endPoint && (
          <Marker coordinate={endPoint} title="Ending Point" />
        )}
      </MapView>

      {!locationSet && !startPressed && (
        <Button onPress={getCurrentLocation} title="Get Current Location" />
      )}
      {!startPressed && (
        <Button
          onPress={handleStartPress}
          title="Start"
          disabled={!locationSet}
        />
      )}
      {startPressed && !endPoint && (
        <Button onPress={handleEndPress} title="End" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
