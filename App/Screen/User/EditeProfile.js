import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Common/Header";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Loader from "../../Components/Loader";

const EditeProfile = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [email, setEmail] = useState(params?.data?.email);
  const [avatar, setAvatar] = useState({
    avatarUrl: params.data?.avatar?.url,
    selected: false,
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(params?.data?.name || "");
  const [page, setPage] = useState(1);

  const setUserInfo = async (data) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data));

    dispatch({
      type: "LOAD_USER",
      user: data,
      token: token,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: avatar?.avatarUrl,
        name: new Date() + "_profile",
        type: "image/jpeg",
      });
      formData.append("name", name);
      await axios
        .put("/user/update", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message);
          setUserInfo(res.data.user);
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar({
        avatarUrl: result.assets[0].uri,
        selected: true,
      });
    }
  };
  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          "/user/update-password",
          {
            oldPassword,
            newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message);
          setUserInfo(res.data.user);
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Edit Profile"}
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
      <ScrollView>
        {page === 1 && (
          <View>
            <Pressable
              style={{
                position: "relative",
                marginTop: 20,
                alignSelf: "center",
                borderWidth: 2,
                borderRadius: 100,
                borderColor: "#000000",
              }}
              onPress={() => pickImage()}
            >
              {avatar.avatarUrl ? (
                <Image source={{ uri: avatar.avatarUrl }} style={styles.img} />
              ) : (
                <Image
                  source={require("../../../assets/images/pngegg.png")}
                  style={styles.img}
                />
              )}
              <Feather
                name="edit"
                size={17}
                color="#ffffff"
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 0,
                  backgroundColor: "#030303",
                  padding: 5,
                  borderRadius: 100,
                }}
                onPress={() => pickImage()}
              />
            </Pressable>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Input your name"
                  placeholderTextColor={"#a4a3a3"}
                  value={name}
                  onChangeText={(txt) => setName(txt)}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Input your email"
                  placeholderTextColor={"#a4a3a3"}
                  value={email}
                  keyboardType="email-address"
                  autoComplete="email"
                  onChangeText={(txt) => setEmail(txt)}
                />
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleUpdate()}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
            <Pressable
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "#00000039",
                padding: 8,
                borderRadius: 90,
              }}
              onPress={() => setPage(2)}
            >
              <AntDesign name="arrowright" size={24} color="black" />
            </Pressable>
          </View>
        )}
        {page === 2 && (
          <View>
            <Pressable
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                backgroundColor: "#00000039",
                padding: 8,
                borderRadius: 90,
              }}
              onPress={() => setPage(1)}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginVertical: 20,
                textAlign: "center",
              }}
            >
              Update Password
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>Old Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your old Password"
                placeholderTextColor={"#a4a3a3"}
                value={oldPassword}
                secureTextEntry
                onChangeText={(txt) => setOldPassword(txt)}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.inputTitle}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your new Password"
                placeholderTextColor={"#a4a3a3"}
                value={newPassword}
                secureTextEntry
                onChangeText={(txt) => setNewPassword(txt)}
              />
            </View>
            <TouchableOpacity
              style={[styles.btn, { marginTop: 30 }]}
              onPress={() => handleUpdatePassword()}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Update Password
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default EditeProfile;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#626262",
    width: "85%",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  input: {
    width: "85%",
    padding: 5,
    height: 50,
    color: "#000",
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#c8c8c8",
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  imgeUpdateBtn: {
    padding: 10,
    marginVertical: 10,
    width: "45%",
    borderRadius: 10,
  },
  btn: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#000",
    marginVertical: 20,
    width: "85%",
    borderRadius: 10,
  },
});
