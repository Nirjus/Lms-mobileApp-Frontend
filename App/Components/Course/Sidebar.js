import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LessonsSection from "./LessonsSection";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const Sidebar = ({ course, isEnrolled, onClose }) => {
  const translateX = useSharedValue(-screenWidth);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: screenWidth - 40, // 75% of the screen width
          backgroundColor: "rgba(255,255,255,1)",
          padding: 0,
          borderWidth: 1,
          borderColor: "#96969686",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
        animatedStyle,
      ]}
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
        <LessonsSection course={course} isEnrolled={isEnrolled} />
      </ScrollView>
    </Animated.View>
  );
};

export default Sidebar;
