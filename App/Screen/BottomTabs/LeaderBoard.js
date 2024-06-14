import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import GoldMedel from "../../../assets/images/first.png";
import SilverMedal from "../../../assets/images/second.png";
import BronzeMedel from "../../../assets/images/third.png";
const LeaderBoard = () => {
  const { token } = useSelector((state) => state.user);
  const { height } = Dimensions.get("screen");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUser = async () => {
    setLoading(true);
    try {
      await axios
        .get("/user/getUsers/bypoint", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setLoading(false);
          setUserList(res.data.users);
        });
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ height: 160, backgroundColor: Colors.PRIMARY, padding: 30 }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            fontSize: 30,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          LeaderBoard
        </Text>
      </View>
      <View style={{ marginTop: -40, height: height - 250 }}>
        <FlatList
          data={userList}
          refreshing={loading}
          onRefresh={() => getAllUser()}
          renderItem={({ item, index }) => (
            <Pressable
              key={item._id}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 20,
                backgroundColor: Colors.WHITE,
                marginHorizontal: 15,
                marginBottom: 8,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                  marginRight: 10,
                  color: "#696969",
                }}
              >
                {index + 1}
              </Text>
              {item?.avatar?.url ? (
                <Image
                  source={{ uri: item?.avatar?.url }}
                  style={{ width: 50, height: 50, borderRadius: 99 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/pngegg.png")}
                  style={{ width: 50, height: 50, borderRadius: 99 }}
                />
              )}
              <View>
                <Text style={{ fontFamily: "outfit-semibold", fontSize: 15 }}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: 14,
                    color: "#686868",
                  }}
                >
                  {item?.point} Points
                </Text>
              </View>
              {index < 3 ? (
                <Image
                  source={
                    index + 1 === 1
                      ? GoldMedel
                      : index + 1 === 2
                      ? SilverMedal
                      : BronzeMedel
                  }
                  style={{ width: 40, height: 40, marginLeft: "auto" }}
                />
              ) : null}
            </Pressable>
          )}
          nestedScrollEnabled
        />
      </View>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
