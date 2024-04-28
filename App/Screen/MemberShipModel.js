import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import Colors from "../utils/Colors";

const MemberShipModel = ({ open, onClose }) => {
  const [select, setSelect] = useState(1);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const memberHandler = async (paymentId, subscription) => {
    try {
      if (!paymentId || !subscription) {
        alert("Please provide all information");
        return;
      }
      await axios
        .post(
          "/member/create",
          {
            paymentId,
            subscription,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          Alert.alert(res.data.message, "Welcome to ELearning Family");
          dispatch({
            type: "ADD_MEMBERSHIP",
            payload: res.data.member,
          });
          onClose();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async () => {
    try {
      const options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: "rzp_test_hzUg2csoySkyWy", // Your api key
        amount: select === 1 ? 30 * 100 : 999 * 100,
        name: "ELearner",
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Razorpay Software",
        },
        theme: { color: "#7450f7" },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          let subscription = {};
          if (select === 1) {
            subscription = {
              subscriptionPeriod: "1 Month",
              price: 30,
            };
          } else {
            subscription = {
              subscriptionPeriod: "1 Year",
              price: 999,
            };
          }
          memberHandler(data.razorpay_payment_id, subscription);
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Modal transparent animationType="slide" visible={open}>
      <View style={{ backgroundColor: "#00000027", flex: 1 }}>
        <Pressable
          style={styles.overlay}
          onPress={() => {
            onClose();
          }}
        ></Pressable>
        <Pressable style={styles.mainView}>
          <ImageBackground
            source={require("../../assets/images/rocket.jpg")}
            style={{ width: "100%", height: 180, marginBottom: 20 }}
            resizeMode="cover"
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 15,
                color: Colors.WHITE,
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              Upgrade To
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 15,
                color: Colors.WHITE,
                marginLeft: 10,
              }}
            >
              ELearner Pro
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 11,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              • Community Support
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              • Access to Source Code
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              • Member Module Access
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              • 70% Off Popular Courses
            </Text>
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              • Doubt Support
            </Text>
          </ImageBackground>
          <Pressable style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelect(1)}
                style={{
                  borderWidth: 0.5,
                  borderColor: "#888888",
                  borderRadius: 10,
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: select === 1 ? "#ffb29a" : "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "outfit-bold",
                    color: "#000",
                  }}
                >
                  {" "}
                  1 Month{" "}
                </Text>
                <View
                  style={{
                    borderColor: "#8e8e8e",
                    borderTopWidth: 1,
                    width: "100%",
                    marginVertical: 5,
                  }}
                />

                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "outfit-bold",
                    color: "#000",
                  }}
                >
                  {" "}
                  ₹30{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelect(2)}
                activeOpacity={0.7}
                style={{
                  borderWidth: 0.5,
                  borderColor: "#888888",
                  borderRadius: 10,
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: select === 2 ? "#ffb29a" : "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "outfit-bold",
                    color: "#000",
                  }}
                >
                  {" "}
                  1 Year{" "}
                </Text>
                <View
                  style={{
                    borderColor: "#8e8e8e",
                    borderTopWidth: 1,
                    width: "100%",
                    marginVertical: 5,
                  }}
                />

                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "outfit-bold",
                    color: "#000",
                  }}
                >
                  {" "}
                  ₹999{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handlePayment()}
              activeOpacity={0.5}
              style={{
                padding: 15,
                backgroundColor: Colors.SECONDARY,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 17,
                  fontFamily: "outfit",
                }}
              >
                Get Membership Now
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#989898",
                textAlign: "center",
                fontSize: 14,
                fontFamily: "outfit",
                marginTop: 10,
              }}
            >
              You can purchase the membership to access all premimum features
            </Text>
            <Text
              style={{
                color: "#989898",
                textAlign: "center",
                fontSize: 14,
                fontFamily: "outfit",
                marginTop: 10,
              }}
            >
              {" "}
              If you want to cancel membership then email us on :
              nirjuskarmakar@gmail.com{" "}
            </Text>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

export default MemberShipModel;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end", // Pushes the modal to the top of the screen
  },
  mainView: {
    width: Dimensions.get("screen").width,
    height: "80%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
});
