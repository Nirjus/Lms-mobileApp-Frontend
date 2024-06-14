import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const SourceSection = ({ isMember }) => {
  const navigation = useNavigation();

  const navigateSubscriptionScreen = () => {
    if (!isMember) {
      navigation.navigate("MemberShipModel", {
        type: "Creation",
      });
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/vip-card2.png")}
          style={{
            height: 90,
            width: 90,
            objectFit: "contain",
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: 15,
              color: "#504f4f",
            }}
          >
            Get your Membership
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 13,
              color: "#2c0909",
              marginTop: 5,
            }}
          >
            For Exciting Offers Claim now.
          </Text>
          <Pressable
            onPress={() => navigateSubscriptionScreen()}
            style={styles.claimBtn}
          >
            <Text
              style={{ color: "#545353", textAlign: "center", fontSize: 13 }}
            >
              Claim now
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SourceSection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  claimBtn: {
    padding: 8,
    width: 100,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#cdcdcd",
  },
});
