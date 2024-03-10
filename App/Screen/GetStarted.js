import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function GetStarted({navigation}) {
  const onPress = React.useCallback(async () => {
    try {
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/home 1.png")}
        style={{ height: 500, width: 250, marginTop: 50, objectFit: "contain" }}
      />
      <View
        style={{
          height: 500,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: -70,
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 50,
            color: Colors.WHITE,
            fontFamily: "outfit",
            fontWeight: "900",
          }}
        >
          {"</>"}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            color: Colors.WHITE,
            fontFamily: "outfit",
          }}
        >
          ELearner
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
            color: Colors.LIGHT_PRIMARY,
            fontFamily: "outfit",
          }}
        >
          Your Ultimate Learning App
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            borderRadius: 99,
            padding: 12,
            marginTop: 25,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.PRIMARY,
              fontFamily: "outfit",
              fontWeight: "800",
            }}
          >
            Get Started
          </Text>
          <AntDesign name="rightcircle" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
