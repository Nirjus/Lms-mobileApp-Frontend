import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating";
import Colors from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ReviewSection = ({ review, course, isChapter = false }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isReviewd = review?.some(
    (item) => item?.userId?.toString() === user?._id
  );
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  const handleAddReview = async () => {
    try {
      if (!rating || !comment) {
        alert("Please provide reviews");
      }
      await axios
        .put(
          `/course/add-review/${course?._id}`,
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
          });
          Alert.alert(res.data.message);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 10,
      }}
    >
      {isChapter && !isReviewd && (
        <View
          style={{
            padding: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#b2b2b2",
          }}
        >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
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
              (Give your review)
            </Text>
            <View style={{ width: 100 }}>
              <StarRating
                disabled={false}
                maxStars={5}
                starSize={18}
                rating={rating}
                fullStarColor={"#ffb700"}
                selectedStar={(rating) => setRating(rating)}
              />
            </View>
          </View>
          <TextInput
            style={{
              padding: 10,
              backgroundColor: "#ebebeb",
              color: Colors.BLACK,
              borderRadius: 5,
            }}
            multiline
            numberOfLines={2}
            placeholder="Wright your comment"
            placeholderTextColor={"#a0a0a0"}
            value={comment}
            onChangeText={(txt) => setComment(txt)}
          />
          <TouchableOpacity
            onPress={() => handleAddReview()}
            style={styles.subminBtn}
          >
            <Text
              style={{ fontFamily: "outfit-semibold", color: Colors.WHITE }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {review?.length !== 0 ? (
        <>
          {review?.map((item, index) => (
            <View style={{ marginBottom: 15 }} key={item._id}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {item?.avatar ? (
                  <Image
                    source={{ uri: item?.avatar }}
                    style={{ height: 40, width: 40, borderRadius: 99 }}
                  />
                ) : (
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: index % 2 === 0 ? "#9f9f9f" : "#8be9ac",
                    }}
                  >
                    <Text>{item?.name.substring(0, 1)}</Text>
                  </View>
                )}
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 16,
                    fontStyle: "italic",
                  }}
                >
                  {item?.name}
                </Text>
              </View>
              <View style={styles.reviewContentSection}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 10,
                  }}
                >
                  <View style={{ width: 100 }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={18}
                      rating={item?.rating}
                      fullStarColor={"#ffb700"}
                      halfStarEnabled={true}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 12,
                      color: "#6a6a6a",
                    }}
                  >
                    {formatDate(item?.createdAt)}
                  </Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "outfit",
                      color: "#000",
                    }}
                  >
                    {item?.comment}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text
          style={{
            marginVertical: 10,
            textAlign: "center",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          No reviews have!
        </Text>
      )}
    </View>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  reviewContentSection: {
    backgroundColor: "#ffffffed",
    padding: 7,
    borderRadius: 10,
    height: "auto",
    marginLeft: 40,
    marginTop: -5,
  },
  subminBtn: {
    width: 120,
    height: 40,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#767ffb",
    justifyContent: "center",
    alignItems: "center",
  },
});
