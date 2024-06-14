import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";

const CourseLebelItem = ({ item }) => {
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
          width: 120,
          borderRadius: 7,
          height: 95,
          resizeMode: "stretch",
        }}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 14,
            marginTop: 10,
            width: 200,
          }}
        >
          {item?.name.length > 45
            ? item?.name.substring(0, 45) + ".."
            : item?.name}
        </Text>
        <View style={{ rowGap: 6 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              <Text
                style={{ fontSize: 11, fontFamily: "outfit", color: "grey" }}
              >
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
      </View>
    </TouchableOpacity>
  );
};

export default CourseLebelItem;

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    columnGap: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 6,
  },
});
