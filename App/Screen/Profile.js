import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, Feather, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Header from "../Components/Common/Header";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "../utils/Colors";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [userinfo, setUserinfo] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      setUserinfo(user);
    }
  }, [user]);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ height: 180, backgroundColor: Colors.PRIMARY, padding: 30 }}
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
          Profile
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: -60 }}
      >
        <View>
          {userinfo?.avatar?.url ? (
            <Image source={{ uri: userinfo?.avatar?.url }} style={styles.img} />
          ) : (
            <Image
              source={require("../../assets/images/pngegg.png")}
              style={styles.img}
            />
          )}

          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "700", color: "#363636" }}>
              Hi <Text style={{ color: "#0ac40a" }}>{userinfo.name}</Text> 👋
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="email" size={22} color="#636363" />
                <Text style={{ fontFamily: "outfit-semibold" }}>
                  {userinfo.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
                paddingBottom: 5,
                borderBottomWidth: 1,
                borderBottomColor: "lightgrey",
              }}
            >
              AccountSettings
            </Text>

            <Pressable
              style={styles.buttn}
              onPress={() =>
                navigation.navigate("EditeProfile", { data: userinfo })
              }
            >
              <Feather name="edit" size={22} color="#7a7a7a" />
              <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                Edit Profile
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttn}
              onPress={() => navigation.navigate("MyCourses")}
            >
              <FontAwesome6 name="book-open" size={22} color="#7a7a7a" />
              <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                My Courses
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttn}
              onPress={() => navigation.navigate("Membership")}
            >
              <MaterialIcons name="verified-user" size={22} color="#7a7a7a" />
              <Text style={{ color: "#7a7a7a", fontWeight: "700" }}>
                Membership
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  img: {
    height: 120,
    width: 120,
    borderRadius: 100,
    resizeMode: "cover",
    alignSelf: "center",
  },
  btnContainer: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
    paddingBottom: 10,
  },
  buttn: {
    margin: 5,
    flexDirection: "row",
    width: 200,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#eaeaea",
    padding: 10,
  },
});
