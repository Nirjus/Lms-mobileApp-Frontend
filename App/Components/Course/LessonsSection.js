import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import SectionHeading from "../SectionHeading";
import Colors from "../../utils/Colors";
import axios from "axios";
import { useSelector } from "react-redux";

const LessonsSection = ({
  course,
  isEnrolled,
  onChapterSelect,
  selectedChapter = {},
}) => {
  const { token } = useSelector((state) => state.user);
  const { update } = useSelector((state) => state.enroll);
  const [completionStatus, setCompletionStatus] = useState({});
  useEffect(() => {
    const fetchCompletionStatus = async () => {
      const statuses = {};
      for (const chapter of course?.chapter) {
        try {
          const { data } = await axios.get(
            `/enroll/check-complete?courseId=${course?._id}&chapterID=${chapter._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          statuses[chapter._id] = data.isComplete;
        } catch (error) {
          console.log(error);
          statuses[chapter._id] = false; // Set completion status to false if there's an error
        }
      }
      setCompletionStatus(statuses);
    };

    fetchCompletionStatus();
  }, [course, token, update]);
  return (
    <>
      <SectionHeading title={"Chapters"} size={20} />
      <View style={{ flex: 1, marginHorizontal: 5, padding: 15 }}>
        <FlatList
          data={course?.chapter}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const isCompleted = completionStatus[item._id] || false;
            return (
              <TouchableOpacity
                onPress={() => {
                  onChapterSelect(index);
                }}
                key={item._id}
                style={[
                  styles.lessonCard,
                  selectedChapter?._id === item?._id && {
                    backgroundColor: Colors.SECONDARY_LIGHT,
                  },
                  isCompleted && {
                    backgroundColor: "#b3f5d6",
                  },
                ]}
              >
                <View style={styles.textSection}>
                  <View
                    style={[
                      {
                        backgroundColor: "#fcad99",
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
                {isEnrolled || index === 0 ? (
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
