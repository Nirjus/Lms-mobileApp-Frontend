import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import Colors from "../../utils/Colors";
import SectionHeading from "../SectionHeading";
import IntroVideoModal from "../Common/modal/introVideoModal";
import { timeFormat } from "../../utils/timeHandler";

const CourseInfo = ({ course, isEnrolled }) => {
  const [openTags, setOpenTags] = useState(false);
  const [introVideo, setIntroVideo] = useState(false);
  return (
    <View style={{ width: "100%", padding: 10 }}>
      <ImageBackground
        borderRadius={5}
        style={styles.imageViewr}
        source={{ uri: course?.banner?.url }}
      >
        <View
          style={{
            padding: 10,
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.introVIdeoButton}
            onPress={() => setIntroVideo(true)}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "outfit",
                color: Colors.PRIMARY,
              }}
            >
              Watch Intro Video
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          marginTop: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            {course?.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#858585",
              marginTop: -2,
              marginBottom: 10,
            }}
          >
            Course level {course?.courseLevel}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <FontAwesome6 name="user" size={14} color={"#757575"} />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 14,
                  color: "#757575",
                }}
              >
                {course.author}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "outfit-semibold",
                color: "#dd5629",
                fontSize: 14,
              }}
            >
              {course?.rating} ⭐ Rating ({course?.reviews?.length})
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
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
                style={{
                  fontSize: 13,
                  fontFamily: "outfit",
                  color: Colors.PRIMARY,
                }}
              >
                {course?.chapter?.length} Chapters ({timeFormat(course?.time)})
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 5,
                  fontFamily: "outfit",
                  fontSize: 12,
                  backgroundColor: "#9f8af7",
                  borderRadius: 99,
                  color: Colors.WHITE,
                }}
              >
                {course?.price === 0 ? "Free" : "Paid"}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={{
            borderWidth: openTags ? 1 : 0,
            borderColor: "#e4e4e4",
            marginHorizontal: 20,
            marginBottom: 10,
            position: "relative",
          }}
        >
          {openTags ? (
            <Feather
              style={{
                position: "absolute",
                alignSelf: "center",
                top: -10,
                backgroundColor: "#fff",
              }}
              name="chevron-up"
              size={24}
              color="black"
              onPress={() => setOpenTags(false)}
            />
          ) : (
            <Feather
              style={{ position: "absolute", alignSelf: "center", top: -10 }}
              name="chevron-down"
              size={24}
              color="black"
              onPress={() => setOpenTags(true)}
            />
          )}
        </Pressable>
        {openTags && (
          <>
            <Text style={{ fontFamily: "outfit-bold", marginLeft: 10 }}>
              About
            </Text>
            <View style={{ marginTop: -5 }}>
              <Markdown>{course?.description}</Markdown>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: 4,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                  marginTop: 6,
                  width: "15%",
                }}
              >
                <FontAwesome6 name="tags" size={15} color="#fd3391" />
                <Text style={{ color: "#777676", fontWeight: "500" }}>
                  Tags:
                </Text>
              </View>
              <View
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#bcbcbc",
                  borderRadius: 5,
                  marginLeft: 10,
                }}
              >
                {course.tags.map((i, index) => (
                  <Text
                    key={index}
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "outfit",
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      fontSize: 12,
                      backgroundColor: "#000",
                      borderRadius: 99,
                      color: Colors.WHITE,
                    }}
                  >
                    {i}
                  </Text>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
      <IntroVideoModal
        open={introVideo}
        onClose={() => setIntroVideo(false)}
        url={course?.chapter[0].video?.url}
      />
    </View>
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
  imageViewr: {
    aspectRatio: 1.77,
  },
  introVIdeoButton: {
    padding: 10,
    borderRadius: 5,

    backgroundColor: "#ffffffb7",
    justifyContent: "center",
    alignItems: "center",
  },
});
