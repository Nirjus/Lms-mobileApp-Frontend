import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import SubmitButton from "../../components/Forms/SubmitButton.js";
import Colors from "../utils/Colors.js";
import avatar from "../../assets/adaptive-icon.png";

import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const setUserInfo = async (data) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data.user));
    await AsyncStorage.setItem("@token", data.token);
    dispatch({
      type: "LOGIN_USER",
      user: data.user,
      token: data.token,
    });
  };
  const submitHandler = async () => {
    try {
      setLoading(true);
      await axios
        .post("/user/login", {
          email,
          password,
        })
        .then((res) => {
          Alert.alert("Success", res.data.message);
          setUserInfo(res.data);
          navigation.navigate("BottomTabs");
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={avatar}
            width={100}
            height={100}
            style={{ width: 120, height: 120, objectFit: "contain" }}
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontFamily: "outfit" }}>EMAIL</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="abcd@gmail.com"
            autoCorrect={false}
            keyboardType="email-address"
            autoComplete={"email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ fontFamily: "outfit" }}>PASSWORD</Text>
          <TextInput
            style={styles.inputBox}
            autoCorrect={false}
            placeholder="$%&^#GJ%#654"
            autoComplete="password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Text
            style={{
              textAlign: "right",
              fontFamily: "outfit",
              fontSize: 13,
              color: "red",
            }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot password?
          </Text>
        </View>

        <SubmitButton
          text={"Login"}
          loading={loading}
          submitCallback={submitHandler}
        />

        <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
          Not have an account?
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate("Registration")}
          >
            {" "}
            SIGNUP
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 50,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    color: Colors.PRIMARY,
    letterSpacing: 2,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  inputBox: {
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    padding: 10,
    color: "#000",
    fontWeight: "500",
  },
});
