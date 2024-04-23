import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const SectionHeading = ({ title, size, color = "#dd502a" }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "outfit-semibold",
          fontSize: size,
          color: color,
          marginVertical: 6,
        }}
      >
        {title}
      </Text>
      <Feather name="arrow-right" size={22} color={color} />
    </View>
  );
};

export default SectionHeading;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
