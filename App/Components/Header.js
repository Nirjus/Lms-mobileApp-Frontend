import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../utils/Colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Header = ({ user }) => {
  const [popup, setPopup] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const togglePopup = () => {
    setPopup(!popup);
  };
  const logoutParsist = async () => {
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("@token");
  };
  const logoutHandler = async () => {
    await axios.get("/user/logout", { withCredentials: true }).then((res) => {
      setPopup(!popup);
      dispatch({
        type: "LOAD_USER",
        user: undefined,
        token: "",
      });
      logoutParsist();
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => togglePopup()}>
            {user?.avatar?.url ? (
              <Image
                source={{ uri: user?.avatar?.url }}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 99,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/images/pngegg.png")}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 99,
                }}
              />
            )}
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#d3d3d3" }}>Welcome</Text>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 18,
                fontFamily: "outfit",
              }}
            >
              {user?.name}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Image
            source={require("../../assets/images/coin.png")}
            style={{ width: 35, height: 35, objectFit: "contain" }}
          />
          <Text style={{ color: Colors.WHITE }}>{user?.point}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={[styles.container, styles.searchBox]}
      >
        <Text style={styles.input}>Search here..</Text>
        <Ionicons name="search-circle-sharp" size={45} color={Colors.PRIMARY} />
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={popup}
        onRequestClose={togglePopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={togglePopup}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subContainer,
                {
                  backgroundColor: "#db1818",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  padding: 10,
                },
              ]}
              onPress={logoutHandler}
            >
              <Text style={styles.menuItem}>Logout</Text>
              <MaterialIcons name="logout" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!user) {
                  alert("Please SignIn first");
                } else {
                  navigation.navigate("BottomTabs", { screen: "Profile" });
                  setPopup(false);
                }
              }}
              style={[
                styles.subContainer,
                {
                  marginTop: 20,
                  backgroundColor: "#000",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  padding: 10,
                },
              ]}
            >
              <Text style={styles.menuItem}>Profile</Text>
              <FontAwesome name="user" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchBox: {
    padding: 3,
    margin: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
  },
  input: {
    fontSize: 16,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 99,
    color: "#989898",
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  menuContainer: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  closeButton: {
    color: "blue",
    textAlign: "right",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    color: "white",
    fontWeight: "800",
  },
});

export default Header;
