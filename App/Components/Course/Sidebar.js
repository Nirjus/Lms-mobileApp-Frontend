import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LessonsSection from "./LessonsSection";

const Sidebar = ({
  course,
  isEnrolled,
  onChapterSelect,
  selectedChapter,
  onClose,
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("screen").width - 50,
        backgroundColor: "rgba(255,255,255,1)",
        padding: 0,
      }}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{
          alignSelf: "flex-end",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <MaterialIcons name="cancel" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        <LessonsSection
          course={course}
          isEnrolled={isEnrolled}
          onChapterSelect={onChapterSelect}
          selectedChapter={selectedChapter}
        />
      </ScrollView>
    </View>
  );
};

export default Sidebar;
