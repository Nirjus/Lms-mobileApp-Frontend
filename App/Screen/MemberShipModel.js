import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import { useNavigation } from "@react-navigation/native";
import Colors from "../utils/Colors";
import SubscriptionModel from "../Components/Common/Subscription/SubscriptionModel";

const MemberShipModel = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const flatListref = useRef(null);
  const { token } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getAllSybscription = async () => {
      try {
        await axios
          .get("/subscription/getAll-subscription")
          .then((res) => {
            setSubscriptions(res.data.subscription);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getAllSybscription();
  }, []);
  const memberHandler = async (
    paymentId,
    price,
    subscriptionPeriod,
    subscriptionId
  ) => {
    try {
      await axios
        .post(
          "/member/create",
          {
            paymentId,
            price,
            subscriptionPeriod,
            subscriptionId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          Alert.alert(res.data.message, "Welcome to ELearning Family");
          navigation.navigate("Membership");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async (price, subscriptionPeriod, subscriptionId) => {
    try {
      const options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: "rzp_test_hzUg2csoySkyWy", // Your api key
        amount: price * 100,
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
          memberHandler(
            data.razorpay_payment_id,
            price,
            subscriptionPeriod,
            subscriptionId
          );
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      alert(error);
    }
  };
  const handleNext = () => {
    if (currentIndex < subscriptions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListref.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListref.current.scrollToIndex({ index: prevIndex, animated: true });
    }
  };
  const renderIndicator = () => {
    return subscriptions.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          currentIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ));
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.mainView}>
        <ImageBackground
          source={require("../../assets/images/rocket-png.png")}
          style={styles.imageBackground}
          resizeMode="contain"
        >
          <View style={{ padding: 10, marginTop: 40 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
              style={{ width: 50 }}
            >
              <Ionicons name="arrow-back-circle" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/images/linearGradient.png")}
        >
          <FlatList
            ref={flatListref}
            horizontal
            data={subscriptions}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SubscriptionModel
                item={item}
                onUpgrade={handlePayment}
                key={item._id}
              />
            )}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width
              );
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}
            style={{ marginTop: -15 }}
          />
          <View style={styles.paging}>
            <TouchableOpacity style={styles.paginationBtn} onPress={handlePrev}>
              <AntDesign name="leftcircleo" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.indicatorContainer}>{renderIndicator()}</View>
            <TouchableOpacity style={styles.paginationBtn} onPress={handleNext}>
              <AntDesign name="rightcircleo" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Pressable>
    </ScrollView>
  );
};

export default MemberShipModel;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "#ffffff",
  },
  imageBackground: {
    width: "100%", // Make sure the image background is as wide as the screen
    aspectRatio: 1, // Adjust this ratio to match your image's aspect ratio
    alignItems: "flex-start", // Align children to the top left
    justifyContent: "flex-start", // Align children to the top
  },
  paging: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationBtn: {
    padding: 5,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#18b623",
  },
  inactiveDot: {
    backgroundColor: "#727272",
  },
});
