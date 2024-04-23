import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import Store from "./redux/store";
import RootNavigation from "./Navigation/navigation";
import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.29.5:8000/api/v1"; // for pc -> 192.168.29.23 for physical device -> 192.168.29.5

export default function App() {
  const [fontsLaded] = useFonts({
    outfit: require("./assets/Fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/Fonts/Outfit-Bold.ttf"),
    "outfit-light": require("./assets/Fonts/Outfit-Light.ttf"),
    "outfit-semibold": require("./assets/Fonts/Outfit-SemiBold.ttf"),
  });
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <RootNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
