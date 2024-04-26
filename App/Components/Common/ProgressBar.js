import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";

const ProgressBar = ({ progress }) => {
  const screenWidth = Dimensions.get("screen").width * 0.8;
  const progressWidth = screenWidth * progress;
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}
    >
      <View
        style={{
          height: 10,
          backgroundColor: "#d3d3d3",
          borderRadius: 99,
          width: screenWidth,
        }}
      >
        <View
          style={{
            height: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 99,
            width: progressWidth,
          }}
        ></View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
