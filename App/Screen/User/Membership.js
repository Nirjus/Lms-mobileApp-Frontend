import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Header from "../../Components/Common/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
const Membership = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const [member, setMember] = useState({});
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const getUserMembership = async () => {
        try {
          await axios
            .get("/member/get-member", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              setMember(res.data.member);
              dispatch({
                type: "ADD_MEMBERSHIP",
                payload: res.data.member,
              });
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        } catch (error) {
          console.log(error);
        }
      };
      getUserMembership();
    }, [])
  );
  const formateDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  const memberShipName = (date) => {
    const [digit, dateType] = date.split(" ");
    if (dateType === "week") {
      return "Weekly plan / Basic";
    } else if (dateType === "day") return "Daily plan / essential";
    else if (dateType === "month") return "Monthly plan / grow";
    else if (dateType === "year") return "Annual plan / premium";
    else {
      return "Best plan ";
    }
  };

  const cancelMembership = async () => {
    try {
      await axios
        .delete("/member/cancel-member", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          Alert.alert("Success", res.data.message);
          dispatch({
            type: "ADD_MEMBERSHIP",
            payload: undefined,
          });
          navigation.goBack();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"My Membership"}
        isLeft
        component={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={40} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!member.email ? (
          <View style={{ rowGap: 20, marginTop: 10, marginHorizontal: 15 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("MemberShipModel");
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-semibold",
                  color: Colors.WHITE,
                  textAlign: "center",
                }}
              >
                Get a membership
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center" }}>You have no membership</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <MaterialIcons name="card-membership" size={24} color="black" />
              <Text style={styles.title}>Membership Card</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{member?.email}</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#b3b3b3",
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "baseline",
                  paddingLeft: 10,
                }}
              >
                <FontAwesome name="calendar-check-o" size={20} color="black" />
                <Text
                  style={{ fontFamily: "outfit-semibold", marginBottom: 10 }}
                >
                  {memberShipName(member?.subscription?.subscriptionPeriod)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Join Date:</Text>
                <Text style={styles.value}>
                  {formateDate(member?.joinDate)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Subscription Plan:</Text>
                <Text style={styles.value}>
                  ₹{member?.subscription?.price} /{" "}
                  {member?.subscription?.subscriptionPeriod}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Subscription endsIn:</Text>
                <Text style={styles.value}>
                  {formateDate(member?.subscription?.endDate)}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#b3b3b3",
                  marginBottom: 15,
                }}
              />
              <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text
                  style={[
                    styles.value,
                    member?.Active ? styles.active : styles.inactive,
                  ]}
                >
                  {member?.Active ? "Active" : "Inactive"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>PaymentId:</Text>
                <Text style={styles.value}>{member?.paymentId}</Text>
              </View>
            </View>
            <View style={{ width: "90%", marginVertical: 20, rowGap: 15 }}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#303030" }]}
                onPress={() => {
                  Alert.alert(
                    "Cancel your membership",
                    "are you sure? this process is irreversable",
                    [
                      {
                        text: "yes",
                        onPress: () => cancelMembership(),
                      },
                      {
                        text: "no",
                        onPress: () => {},
                      },
                    ]
                  );
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-semibold",
                    color: Colors.WHITE,
                    textAlign: "center",
                  }}
                >
                  Cancel Membership
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("MemberShipModel");
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-semibold",
                    color: Colors.WHITE,
                    textAlign: "center",
                  }}
                >
                  {member?.Active ? "Change Plan" : "Renewal Plan"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Membership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "outfit",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontFamily: "outfit-semibold",
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontFamily: "outfit",
    fontSize: 15,
    marginBottom: 15,
  },
  active: {
    backgroundColor: "#08bc08",
    padding: 2,
    paddingHorizontal: 10,
    fontWeight: "600",
    color: "#fff",
    borderRadius: 99,
  },
  inactive: {
    backgroundColor: "red",
    padding: 2,
    paddingHorizontal: 10,
    fontWeight: "600",
    color: "#fff",
    borderRadius: 99,
  },
  btn: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "#7c7efd",
  },
});
