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
import axios from "axios";
import { useDispatch } from "react-redux";
import SubmitButton from "../../components/Forms/SubmitButton.js";
import Colors from "../utils/Colors.js";
import avatar from "../../assets/adaptive-icon.png";

import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const submitHandler = async () => {
    try {
      setLoading(true);
      await axios
        .post("/user/forgot-password", {
          email,
          newPassword,
        })
        .then((res) => {
          Alert.alert("Success", res.data.message);

          navigation.navigate("Login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
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
          <Text style={{ fontFamily: "outfit" }}>RECOVERY PASSWORD</Text>
          <TextInput
            style={styles.inputBox}
            autoCorrect={false}
            placeholder="$%&^#GJ%#654"
            autoComplete="password"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>

        <SubmitButton
          text={"Send Email"}
          loading={loading}
          submitCallback={submitHandler}
        />

        <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
          Back to login
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate("Login")}
          >
            {"  "}
            LOGIN
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 50,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    color: Colors.PRIMARY,
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
