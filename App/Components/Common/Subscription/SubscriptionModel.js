import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import { useSelector } from "react-redux";

const SubscriptionModel = ({ item, onUpgrade }) => {
  const { subscription } = useSelector((state) => state.member);

  return (
    <View style={styles.subsContainer}>
      <View style={styles.subsCard}>
        <Text style={styles.title}>{item?.modelName}</Text>
        {subscription?.subscription?.subscriptionId === item?._id ? (
          <View
            style={{
              borderRadius: 10,
              width: 100,
              backgroundColor: "#f7416f",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              bottom: -10,
            }}
          >
            <Text style={{ fontSize: 13, color: "#fff" }}>Current plan</Text>
          </View>
        ) : (
          <Text
            style={{ fontWeight: "600", color: "#fff", textAlign: "center" }}
          >
            Upgrade to ELearner Pro
          </Text>
        )}
        <View
          style={[
            styles.priceSection,
            subscription?.subscription?.subscriptionId === item?._id && {
              borderColor: "#f7416f",
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={{ color: Colors.WHITE, fontSize: 15, fontWeight: "800" }}
          >
            {item?.validity}
          </Text>
          <Text
            style={{ color: Colors.WHITE, fontSize: 15, fontWeight: "800" }}
          >
            ₹{item?.price}.00
          </Text>
        </View>
        <View style={{ paddingHorizontal: 5, flex: 1 }}>
          {item?.benifits?.map((bn, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                marginBottom: 4,
              }}
            >
              <Feather name="check-circle" size={16} color="#10a61a" />
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "#575757",
                }}
              >
                {bn}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.upgradeButn}
          onPress={() => onUpgrade(item?.price, item?.validity, item?._id)}
          disabled={subscription?.subscription?.subscriptionId === item?._id}
        >
          <Text style={{ color: Colors.WHITE, fontFamily: "outfit-bold" }}>
            Upgrade Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionModel;

const styles = StyleSheet.create({
  subsContainer: {
    width: Dimensions.get("screen").width,
    alignItems: "center",
    zIndex: 10,
    flex: 1,
  },
  subsCard: {
    borderWidth: 1,
    borderColor: "#c6c6c6",
    borderRadius: 10,
    backgroundColor: "#ffffff47",
    width: "85%",
    padding: 10,
    minHeight: 320,
  },
  title: {
    fontFamily: "outfit-semibold",
    fontSize: 22,
    color: Colors.WHITE,
    textAlign: "center",
  },
  priceSection: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    elevation: 2,
    paddingHorizontal: 20,
  },
  upgradeButn: {
    padding: 10,
    margin: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
});
