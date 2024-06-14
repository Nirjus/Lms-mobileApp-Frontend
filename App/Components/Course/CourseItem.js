import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";

const CourseItem = ({ item }) => {
  const navigation = useNavigation();
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
          width: 210,
          borderRadius: 10,
          height: 130,
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
            marginBottom: 6,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 13,
              color: Colors.LIGHT_PRIMARY,
            }}
          >
            {item.author}
          </Text>
          <Text
            style={{
              fontFamily: "outfit-light",
              color: "#dd5629",
              fontSize: 12,
            }}
          >
            {item?.rating} ⭐ Rating
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <AntDesign name="book" size={14} color="#d64c25" />
            <Text style={{ fontSize: 11, fontFamily: "outfit", color: "grey" }}>
              {item?.chapter?.length} Chapters ({item?.time})
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: Colors.PRIMARY,
              fontSize: 13,
            }}
          >
            {item?.price === 0 ? "Free" : "Paid"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: Colors.WHITE,
    // width: 260,
    marginHorizontal: 7,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 6,
  },
});
