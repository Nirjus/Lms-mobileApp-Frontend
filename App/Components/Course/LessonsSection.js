import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import SectionHeading from "../SectionHeading";
import Colors from "../../utils/Colors";

const LessonsSection = ({ course, isEnrolled }) => {
  return (
    <>
      <SectionHeading title={"Chapters"} size={20} />
      <View style={{ flex: 1, marginHorizontal: 5, padding: 15 }}>
        <FlatList
          data={course?.chapter}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item._id} style={styles.lessonCard}>
              <View style={styles.textSection}>
                <View
                  style={{
                    backgroundColor: Colors.SECONDARY_LIGHT,
                    width: 26,
                    height: 26,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 99,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontWeight: "700",
                      fontSize: 11,
                      color: Colors.SECONDARY,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, fontFamily: "outfit-semibold" }}>
                  {item?.title.length > 32
                    ? item?.title.substring(0, 32) + ".."
                    : item?.title}
                </Text>
              </View>
              {isEnrolled || index === 0 ? (
                <Feather name="play-circle" size={24} color={Colors.PRIMARY} />
              ) : (
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={Colors.SECONDARY}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default LessonsSection;

const styles = StyleSheet.create({
  lessonCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  textSection: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
