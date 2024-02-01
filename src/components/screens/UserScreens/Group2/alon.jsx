import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Alon() {
  const initialRegion = {
    latitude: 37.7749, // Example latitude (San Francisco, CA)
    longitude: -122.4194, // Example longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <View style={styles.container}>
      <Text>HELLO WORLD from Alon</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
