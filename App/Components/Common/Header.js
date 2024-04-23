import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = ({ title }) => {
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
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 18,
          color: "#000",
        }}
      >
        {title}
      </Text>
      <View style={{ width: 40 }}></View>
    </View>
  );
};

export default Header;
