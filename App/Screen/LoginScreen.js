import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
import { useOAuth } from "@clerk/clerk-expo";

export default function LoginScreen() {

    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/home 1.png")}
        style={{ height: 500, width: 250, marginTop: 50, objectFit: "contain" }}
      />
      <View
        style={{
          height: 500,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: -70,
          padding: 20,
          display: "flex",
            alignItems:"center"
        }}
      >
         <Text style={{fontSize:50,color: Colors.WHITE,
            fontFamily: "outfit", fontWeight:"900"}}>{"</>"}</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            color: Colors.WHITE,
            fontFamily: "outfit",
          }}
        >
          ELearner
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
            color: Colors.LIGHT_PRIMARY,
            fontFamily: "outfit",
          }}
        >
          Your Ultimate Learning App
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.WHITE,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            borderRadius: 99, padding:10,
            marginTop:25,
          }}
        >
          <Image
            source={require("../../assets/images/googlIcon.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: Colors.PRIMARY,
              fontFamily: "outfit",
              fontWeight:"600",
              paddingRight:10
            }}
          >
           Login with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
