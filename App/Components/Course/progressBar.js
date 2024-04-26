import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";

const ProgressBar = ({ contentLength, contentIndex }) => {
  const arrySize = Array.from(
    { length: contentLength },
    (_, index) => index + 1
  );

  const width = 100 / contentLength;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}
    >
      {arrySize.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: `${
              index <= contentIndex ? Colors.PRIMARY : "#b1b1b1"
            }`,
            width: width + "%",
            borderRadius: 10,
            height: 8,
            margin: 5,
            flex: 1,
          }}
        ></View>
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
