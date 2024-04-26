import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Header from "../../Components/Common/Header";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Membership = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const [member, setMember] = useState({});

  useEffect(() => {
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
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUserMembership();
  }, []);
  const formattedJoinDate = new Date(member?.joinDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
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
      <View style={styles.container}>
        <Text style={styles.title}>Membership Card</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{member?.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Join Date:</Text>
            <Text style={styles.value}>{formattedJoinDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Subscription Period:</Text>
            <Text style={styles.value}>
              {member?.subscription?.subscriptionPeriod}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{member?.subscription?.price}₹</Text>
          </View>
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
        </View>
      </View>
    </View>
  );
};

export default Membership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
});
