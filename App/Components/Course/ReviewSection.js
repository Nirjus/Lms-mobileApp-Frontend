import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import StarRating from "react-native-star-rating";
import { Feather } from "@expo/vector-icons";

const ReviewSection = ({ review }) => {
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 10,
      }}
    >
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
        <View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#c7c7fe",
              }}
            >
              <Feather name="user" size={20} color="#7272fe" />
            </View>
            <Text
              style={{
                color: "#9a9a9a",
                fontWeight: "bold",
                fontSize: 16,
                fontStyle: "italic",
              }}
            >
              abc_xyz
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
                  rating={0}
                  fullStarColor={"#ffb700"}
                  halfStarEnabled={true}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "outfit",
                  color: "#9a9999",
                }}
              >
                give your first rating
              </Text>
            </View>
          </View>
        </View>
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
