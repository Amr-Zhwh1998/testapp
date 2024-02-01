import { Button, StyleSheet, Text, View } from "react-native";
import Screen from "./GenericComponents/Screen";
export default function Feature4_Profile({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>{process.env.EXPO_PUBLIC_API_ADDRESS}</Text>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});