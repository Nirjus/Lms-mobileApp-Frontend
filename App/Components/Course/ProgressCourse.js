import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import ProgressBar from "../Common/ProgressBar";

const ProgressCourse = ({ item, completedChapter }) => {
  const navigation = useNavigation();
  //   totalChapter

  // complete chapter
  const calculatePerComplete = () => {
    const persentage = completedChapter?.length / item?.chapter?.length;

    return persentage.toFixed(2);
  };
  return (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => {
        navigation.navigate("CourseDetails", { data: item });
      }}
    >
      <Image
        source={{ uri: item?.banner?.url }}
        style={{
          width: "100%",
          borderRadius: 10,
          height: 170,
          resizeMode: "cover",
        }}
      />
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 14,
            margin: 4,
            width: 200,
          }}
        >
          {item?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 13,
                marginHorizontal: 4,
                color: Colors.LIGHT_PRIMARY,
              }}
            >
              {item.author}
            </Text>
            {item?.chapter?.length !== 0 && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <AntDesign name="book" size={20} color="#d64c25" />
                <Text
                  style={{ fontSize: 11, fontFamily: "outfit", color: "grey" }}
                >
                  {calculatePerComplete() * 100} % ({completedChapter?.length}/
                  {item?.chapter?.length} chapter completed)
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-light",
                color: "#dd5629",
                fontSize: 12,
              }}
            >
              {item?.rating} ⭐ Rating
            </Text>
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: Colors.PRIMARY,
                marginTop: 5,
              }}
            >
              {item?.price === 0 ? "Free" : "Paid"}
            </Text>
          </View>
        </View>
      </View>
      <ProgressBar progress={calculatePerComplete()} />
    </TouchableOpacity>
  );
};

export default ProgressCourse;

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: Colors.WHITE,
    // width: 260,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
});
