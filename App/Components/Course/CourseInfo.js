import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import Markdown from "react-native-markdown-display";
import Colors from "../../utils/Colors";
import SectionHeading from "../SectionHeading";

const CourseInfo = ({ course }) => {
  return (
    course && (
      <View>
        <Video
          // ref={video}
          style={styles.video}
          source={{
            uri: course?.chapter[0]?.video.url,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "outfit-bold",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              {course?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginLeft: 5,
                  }}
                >
                  <FontAwesome6 name="user" size={17} color={Colors.PRIMARY} />
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 15,
                      marginHorizontal: 4,
                      color: Colors.PRIMARY,
                    }}
                  >
                    {course.author}
                  </Text>
                </View>
                {course?.chapter?.length !== 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <AntDesign name="book" size={22} color="#d64c25" />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "outfit",
                        color: "grey",
                      }}
                    >
                      {course?.chapter?.length} Chapters ({course?.time} h)
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
                    fontFamily: "outfit-semibold",
                    color: "#dd5629",
                    fontSize: 15,
                  }}
                >
                  {course?.rating} ⭐ Rating
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 16,
                    color: Colors.PRIMARY,
                    marginTop: 5,
                  }}
                >
                  {course?.price === 0 ? "Free" : "Paid"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                padding: 6,
                backgroundColor: "#d0c3ff",
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons name="filter" size={20} color="#714afc" />
              <Text
                style={{
                  textTransform: "capitalize",
                  fontFamily: "outfit-semibold",
                  fontWeight: "600",
                  fontSize: 15,
                  color: "#714afc",
                }}
              >
                {course.courseLevel} Level
              </Text>
            </View>
            <View
              style={{
                padding: 6,
                backgroundColor: "#ffcde4",
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome6 name="tags" size={18} color="#fd3391" />
              <Text
                style={{
                  textTransform: "capitalize",
                  fontFamily: "outfit-semibold",
                  fontWeight: "600",
                  fontSize: 15,
                  color: "#fd3391",
                }}
              >
                {course.tags}
              </Text>
            </View>
          </View>
          <SectionHeading title={"Description"} size={20} />
          <View style={{ width: "90%", alignSelf: "center", marginTop: -10 }}>
            <Markdown>{course?.description}</Markdown>
          </View>
        </View>
      </View>
    )
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  video: {
    width: "98%",
    alignSelf: "center",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});
