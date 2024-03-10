import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import SubmitButton from "../../components/Forms/SubmitButton.js";
import Colors from "../utils/Colors.js";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!email && !password) {
        Alert.alert("Please fill All fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      await axios
        .post("/user/login", {
          email,
          password,
        })
        .then((res) => {
          alert(res.data.message);
          dispatch({
            type: "LOAD_USER",
            user: res.data.loginUser,
          })

          navigation.navigate("TabNavigation")
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text>EMAIL</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="abcd@gmail.com"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete={"email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>PASSWORD</Text>
        <TextInput
          style={styles.inputBox}
          autoCorrect={false}
          placeholder="$%&^#GJ%#654"
          autoComplete="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <SubmitButton
        text={"Login"}
        loading={loading}
        submitCallback={submitHandler}
      />

      <Text style={{ textAlign: "center" }}>
        Not have an account?
        <Text
          style={{ color: "red" }}
          onPress={() => navigation.navigate("Registration")}
        >
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    padding: 10,
    color: "#000",
    fontWeight: "500",
  },
});
