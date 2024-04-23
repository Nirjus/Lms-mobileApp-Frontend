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
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../utils/Colors";
import axios from "axios";
import { useDispatch } from "react-redux";

const Header = ({ user }) => {
  const [popup, setPopup] = React.useState(false);
  const dispatch = useDispatch();
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
                fontSize: 20,
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
          <Text style={{ color: Colors.WHITE }}>5620</Text>
        </View>
      </View>

      <View style={[styles.container, styles.searchBox]}>
        <TextInput placeholder="Search Cources.." style={styles.input} />
        <Ionicons name="search-circle-sharp" size={45} color={Colors.PRIMARY} />
      </View>
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
    height: 46,
    borderRadius: 99,
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
