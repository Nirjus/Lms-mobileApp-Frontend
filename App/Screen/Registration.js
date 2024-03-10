import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import SubmitButton from "../../components/Forms/SubmitButton";
import avatar from "../../assets/images/pngegg.png";
import Colors from "../utils/Colors";

export default function Registration({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill All fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      
    await axios.post(
        "/user/register",
        {
          name,
          email,
          password,
        }
      ).then((res) => {
        alert(res.data.message);
        navigation.navigate("Login");
      }).catch((error) => {
        alert(error.response.data.message)
      })
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
     <View style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
     <Image source={avatar} width={100} height={100} style={{width:120, height:120, objectFit:"contain"}} />
     </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text>NAME</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="abcde"
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
        text={"Submit"}
        loading={loading}
        submitCallback={submitHandler}
      />

      <Text style={{ textAlign: "center" }}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.PRIMARY,
    letterSpacing: 2,
    marginBottom: 20,
    textTransform: "uppercase"
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
