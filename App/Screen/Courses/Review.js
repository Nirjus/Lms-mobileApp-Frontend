import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../utils/Colors";

const Review = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddReview = async () => {
    try {
      setLoading(true);
      await axios
        .put(
          `/course/add-review/${params?.course?._id}`,
          {
            rating,
            comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: "INIT_COURSE",
            payload: res.data.course,
          });
          Alert.alert(res.data.message);
          navigation.navigate("CourseDetails", { data: res.data.course });
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
        <View style={{ width: "100%" }}>
          <ImageBackground
            borderRadius={5}
            source={{ uri: params?.course?.banner?.url }}
            style={{
              aspectRatio: 1.77,
            }}
          >
            <View style={styles.lebel}>
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                Already {params?.course?.reviews?.length} students are reviewd
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            borderWidth: 1,
            width: "100%",
            borderColor: "#c8c8c8",
            margin: 10,
          }}
        />

        <View
          style={{
            padding: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-semibold",
                fontSize: 15,
                color: Colors.BLACK,
              }}
            >
              (Give us ratintg out of 5)
            </Text>
            <View style={{ width: 150 }}>
              <StarRating
                disabled={false}
                maxStars={5}
                starSize={25}
                rating={rating}
                fullStarColor={"#ffb700"}
                selectedStar={(rating) => setRating(rating)}
              />
            </View>
          </View>
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: 15,
              color: Colors.BLACK,
              marginTop: 15,
              marginLeft: 5,
            }}
          >
            Give Review
          </Text>
          <TextInput
            style={{
              padding: 10,
              backgroundColor: "#ebebeb",
              color: Colors.BLACK,
              borderRadius: 5,
              marginTop: 5,
              marginBottom: 10,
            }}
            multiline
            numberOfLines={3}
            placeholder="Wright your feedback, what should we improve in this course"
            placeholderTextColor={"#a0a0a0"}
            value={comment}
            onChangeText={(txt) => setComment(txt)}
          />
          <TouchableOpacity
            onPress={() => handleAddReview()}
            style={styles.subminBtn}
            disabled={loading}
          >
            <Text
              style={{ fontFamily: "outfit-semibold", color: Colors.WHITE }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View
            style={{ borderWidth: 1, borderColor: "#c8c8c8", margin: 10 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    height: Dimensions.get("screen").height,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContentSection: {
    backgroundColor: "#ffffffed",
    padding: 7,
    borderRadius: 10,
    height: "auto",
    marginLeft: 40,
    marginTop: -5,
  },
  lebel: {
    width: 100,
    height: 100,
    backgroundColor: "#ff0059",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    top: -15,
    left: -6,
    transform: [{ rotate: "-30deg" }],
  },
  subminBtn: {
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#767ffb",
    justifyContent: "center",
    alignItems: "center",
  },
});
