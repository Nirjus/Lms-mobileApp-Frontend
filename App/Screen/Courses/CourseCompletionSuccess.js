import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";

const CourseCompletionSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LottieView
        loop
        autoPlay
        style={{
          width: "100%",
          height: 300,
        }}
        source={require("../../../assets/Animation/Animation - 1714280483646.json")}
      />
      <View style={styles.textSection}>
        <Text style={styles.mainText}>Congratulations! 🎉</Text>
        <Text style={styles.subtext}>
          {" "}
          You successfully complete your course
        </Text>

        <Text style={styles.miniText}> You can download your cirtificate</Text>
        <Text style={styles.miniText}>from your Dashboard</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("BottomTabs", { screen: "Profile" })
          }
          style={styles.btn}
        >
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: 15,
              color: Colors.BLACK,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseCompletionSuccess;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  textSection: {
    marginTop: 5,
    padding: 10,
  },
  mainText: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: Colors.PRIMARY,
    textAlign: "center",
    marginVertical: 10,
  },
  subtext: {
    fontFamily: "outfit-semibold",
    fontSize: 23,
    color: Colors.SECONDARY,
    textAlign: "center",
    marginBottom: 20,
  },
  miniText: {
    fontFamily: "outfit-semibold",
    fontSize: 15,
    color: Colors.LIGHT_PRIMARY,
    textAlign: "center",
  },
  btn: {
    width: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#a79bea",
    alignSelf: "center",
    marginTop: 10,
  },
});
