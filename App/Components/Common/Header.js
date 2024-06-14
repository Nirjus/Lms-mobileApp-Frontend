import { View, Text } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
const Header = ({ title, isLeft = false, component }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: 40, height: 40 }}>
        {isLeft && <>{component}</>}
      </View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
          color: "#000",
        }}
      >
        {title}
      </Text>
      <View style={{ width: 40, height: 40 }}></View>
    </View>
  );
};

export default Header;
