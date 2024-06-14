import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import Store from "./redux/store";
import RootNavigation from "./Navigation/navigation";

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
