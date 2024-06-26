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
import SubmitButton from "../../components/Forms/SubmitButton";
import avatar from "../../assets/adaptive-icon.png";
import Colors from "../utils/Colors";

export default function Registration({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);
      await axios
        .post("/user/register", {
          name,
          email,
          password,
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
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>SIgnup</Text>
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
          <Text style={{ fontFamily: "outfit" }}>NAME</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="John dow"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text style={{ fontFamily: "outfit" }}>EMAIL</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="dowjown@gmail.com"
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
        </View>

        <SubmitButton
          text={"SignUp"}
          loading={loading}
          submitCallback={submitHandler}
        />

        <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
          Already have an account?
          <Text
            style={{ color: "red" }}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            LOGIN
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.PRIMARY,
    letterSpacing: 2,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  inputBox: {
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    padding: 10,
    color: "#000",
    fontWeight: "500",
  },
});
