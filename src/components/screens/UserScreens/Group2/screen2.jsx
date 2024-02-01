import React from "react";
import Alina from "./alina";
import Moran from "./moran";
import Alon from "./alon";
import Hadar from "./hadar";
import SearchScreen from "./SearchScreen";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import QRScanner from "./QRScanner";

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function Screen2() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="QR Scanner" component={QRScanner} />
      <BottomTab.Screen name="Hello from Group 2" component={NewTabScreen} />
      <BottomTab.Screen name="Grave Search" component={SearchScreen} />
    </BottomTab.Navigator>
  );
}

const HomeScreen = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Alina" component={AlinaTest} />
    <TopTab.Screen name="Alon" component={AlonTest} />
    <TopTab.Screen name="Moran" component={MoranTest} />
    <TopTab.Screen name="Hadar" component={HadarTest} />
  </TopTab.Navigator>
);

const NewTabScreen = () => (
  <View style={styles.mainScreen}>
    <View style={styles.hello}>
      <Text>HELLO WORLD 2</Text>
      <Alina />
      <Moran />
      <Alon />
      <Hadar />
    </View>
  </View>
);

// Components for Alina, Alon, Moran, and Hadar
const AlinaTest = () => (
  <View style={styles.tabContent}>
    <Alina/>
  </View>
);

const AlonTest = () => (
  <View style={styles.tabContent}>
    <Alon />
  </View>
);

const MoranTest = () => (
  <View style={styles.tabContent}>
    <Moran />
  </View>
);

const HadarTest = () => (
  <View style={styles.tabContent}>
    <Text>Hadar's Content</Text>
  </View>
);

const styles = StyleSheet.create({
  mainScreen: {
    justifyContent: "flex-start",
    flex: 1,
  },
  hello: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  tabContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
