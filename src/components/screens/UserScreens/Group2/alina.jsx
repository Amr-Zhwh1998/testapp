import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Alina() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [recording, setRecording] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [savedPaths, setSavedPaths] = useState([]);
  const [firstRecordingStarted, setFirstRecordingStarted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const startLocationUpdates = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
        const initialLocation = await Location.getCurrentPositionAsync({});
        if (isMounted) {
          setLocation(initialLocation);
        }

        const locationSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 5 },
          (newLocation) => {
            if (isMounted) {
              setLocation(newLocation);
              if (recording && !clickedCoordinates) {
                setCurrentPath((prevPath) => [...prevPath, newLocation.coords]);
              }
            }
          }
        );

        return () => {
          locationSubscription.remove();
        };
      } catch (error) {
        console.error('Error initializing location:', error);
        if (isMounted) {
          setErrorMsg('Error initializing location');
        }
      }
    };

    startLocationUpdates();

    // Load saved paths on component mount
    loadSavedPaths();

    return () => {
      isMounted = false;
    };
  }, [recording, clickedCoordinates]);

  const handleMapPress = (e) => {
    const clickedCoordinate = e.nativeEvent.coordinate;
    setClickedCoordinates(clickedCoordinate);

    if (!firstRecordingStarted) {
      setCurrentPath([clickedCoordinate]);
      setFirstRecordingStarted(true);
    } else {
      setCurrentPath((prevPath) => [...prevPath, clickedCoordinate]);
    }
  };

  const startRecording = () => {
    setCurrentPath([]);
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
    const randomColor = getRandomColor();
    setPaths((prevPaths) => [...prevPaths, { coordinates: currentPath, strokeColor: randomColor }]);
    savePathToMongoDB(currentPath, randomColor);
  };

  const savePathToMongoDB = async (path, strokeColor) => {
    try {
      const coordinates = path.map(({ latitude, longitude }) => ({ latitude, longitude }));

      const response = await axios.post('http://172.16.1.111:3000/savePath', { coordinates, strokeColor });

      if (response.status === 200) {
        console.log('Path sent to MongoDB successfully');
      } else {
        console.error('Failed to send path to MongoDB');
      }

      // Reload saved paths after saving
      loadSavedPaths();
    } catch (error) {
      console.error('Error saving path to MongoDB:', error);
    }
  };

  const loadSavedPaths = async () => {
    try {
      const response = await axios.get('http://172.16.1.111:3000/getPaths');

      if (response.status === 200) {
        const paths = response.data.map((path) => ({
          coordinates: path.coordinates,
          strokeColor: path.strokeColor,
        }));

        setSavedPaths(paths);
      } else {
        console.error('Failed to fetch paths from MongoDB');
      }
    } catch (error) {
      console.error('Error loading saved paths from MongoDB:', error);
    }
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 32.62085182793582,
              longitude: 35.33029820770025,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {clickedCoordinates && (
              <Marker
                coordinate={clickedCoordinates}
                title="Clicked Point"
                description="This is a clicked point"
              />
            )}

            {paths.map((path, index) => (
              <Polyline
                key={index}
                coordinates={path.coordinates}
                strokeColor={path.strokeColor}
                strokeWidth={2}
              />
            ))}

            {savedPaths.map((path, index) => (
              <Polyline
                key={index}
                coordinates={path.coordinates}
                strokeColor={path.strokeColor}
                strokeWidth={2}
              />
            ))}
          </MapView>

          {/* Move the button container up by adjusting the marginBottom */}
          <View style={styles.buttonContainer}>
            <Button
              title={recording ? 'Stop Recording' : 'Start Recording'}
              onPress={recording ? stopRecording : startRecording}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100, // Adjust this value as needed to move the button higher from the bottom
    alignSelf: 'center',
  },
});
