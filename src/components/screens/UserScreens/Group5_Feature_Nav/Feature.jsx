import { Button, Text,View, StyleSheet } from "react-native";

export default function Feature5_Nav({ navigation })
{
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{process.env.EXPO_PUBLIC_API_ADDRESS}</Text>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});