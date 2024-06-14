import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import SectionHeading from "../SectionHeading";
import Colors from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const LessonsSection = ({ course, isEnrolled }) => {
  const { enrollData } = useSelector((state) => state.enroll);
  const { chapterProgressIndex } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onChapterSelect = (item, index) => {
    if (!isEnrolled && !item?.isFree) {
      alert("This chapter is not free, Please Enroll Course!");
      return;
    } else {
      dispatch({
        type: "SET_INDEX",
        payload: index,
      });
      navigation.navigate("ChapterContent", {
        chapter: item,
        isEnrolled: isEnrolled,
      });
    }
  };
  const isComplete = (chapterID) => {
    return enrollData?.completedChapter?.some(
      (ch) => ch.chapterID === chapterID
    );
  };
  return (
    <>
      <SectionHeading title={"Chapters"} size={20} />
      <View style={{ flex: 1, padding: 15 }}>
        <FlatList
          data={course?.chapter}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const isCompleted = isComplete(item?._id);
            return (
              <TouchableOpacity
                onPress={() => {
                  onChapterSelect(item, index);
                }}
                key={item._id}
                style={[
                  styles.lessonCard,
                  chapterProgressIndex === index
                    ? {
                        backgroundColor: "#f8ebe4",
                      }
                    : {
                        backgroundColor: "#fff",
                      },
                  isCompleted && {
                    backgroundColor: "#e2fdf1",
                  },
                ]}
              >
                <View style={styles.textSection}>
                  <View
                    style={[
                      {
                        backgroundColor: "#f5c0b3",
                        width: 26,
                        height: 26,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 99,
                      },
                      isCompleted && { backgroundColor: "#6aeeb1" },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: "outfit",
                          fontWeight: "700",
                          fontSize: 11,
                          color: Colors.SECONDARY,
                        },
                        isCompleted && { color: "#398a64" },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, fontFamily: "outfit-semibold" }}>
                    {item?.title.length > 30
                      ? item?.title.substring(0, 30) + ".."
                      : item?.title}
                  </Text>
                </View>
                {isEnrolled || item?.isFree ? (
                  <>
                    {isCompleted ? (
                      <AntDesign
                        name="checkcircle"
                        size={24}
                        color={"#5ad6a7"}
                      />
                    ) : (
                      <Feather
                        name="play-circle"
                        size={24}
                        color={Colors.SECONDARY}
                      />
                    )}
                  </>
                ) : (
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={Colors.SECONDARY}
                  />
                )}
              </TouchableOpacity>
            );
          }}
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
    borderColor: "#cbcaca",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  textSection: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
