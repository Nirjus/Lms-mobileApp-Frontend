import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";

const BannerModel = ({ isCompleted }) => {
  return (
    <View
      style={[
        styles.container,
        isCompleted
          ? { backgroundColor: "#40b368" }
          : { backgroundColor: "#fd8f70" },
      ]}
    >
      {isCompleted ? (
        <View style={styles.textAlign}>
          <AntDesign name="checksquareo" size={20} color="white" />
          <Text style={styles.textFormat}>Course completed Successfully</Text>
        </View>
      ) : (
        <View style={styles.textAlign}>
          <Feather name="alert-triangle" size={20} color="white" />
          <Text style={styles.textFormat}>Course not completed yet</Text>
        </View>
      )}
    </View>
  );
};

export default BannerModel;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: 50,
    paddingLeft: 30,
    justifyContent: "center",
  },
  textAlign: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  textFormat: {
    fontFamily: "outfit-semibold",
    color: Colors.WHITE,
  },
});
