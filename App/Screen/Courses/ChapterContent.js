import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { Feather, Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Common/Header";
import RenderHtml from "react-native-render-html";
import Colors from "../../utils/Colors";
import LessonsSection from "../../Components/Course/LessonsSection";
import ProgressBar from "../../Components/Course/progressBar";
import Sidebar from "../../Components/Course/Sidebar";

const ChapterContent = () => {
  const { params } = useRoute();
  const { token } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [userEnrollment, setUserEnrollment] = useState(params?.isEnrolled);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [course, setCourse] = useState(params?.course);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const onChapterComplete = async (item) => {
    try {
      await axios
        .put(
          `/enroll/chapter-complete?courseId=${course?._id}`,
          {
            chapterID: item?._id,
            chapterTitle: item?.title,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          dispatch({
            type: "UPDATE_ENROLLEMENT",
          });
          if (course?.chapter?.length === res.data.chapterLength) {
            Alert.alert(
              "Congratulation",
              "You successfully complete the course"
            );
          } else {
            ToastAndroid.showWithGravity(
              res.data.message,
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
          }
        })
        .catch((error) => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
    } catch (error) {
      alert(error);
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewWidth = event.nativeEvent.layoutMeasurement.width;
    const chapterIndex = Math.floor(contentOffsetX / viewWidth);
    setActiveIndex(chapterIndex);
  };
  const nextPage = (index) => {
    if (course?.chapter?.length <= index + 1) {
      navigation.goBack();
      return;
    }
    setActiveIndex(index + 1);
    flatListRef.current.scrollToIndex({ animated: true, index: index + 1 });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Chapters`}
        isLeft
        component={
          <TouchableOpacity activeOpacity={0.5} onPress={() => toggleSidebar()}>
            <Feather name="sidebar" size={30} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <ProgressBar
          contentLength={course?.chapter?.length}
          contentIndex={activeIndex}
        />
        <FlatList
          ref={flatListRef}
          data={course?.chapter}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              key={item?._id}
              style={{
                width: Dimensions.get("screen").width,
                position: "relative",
              }}
            >
              {item?.video?.url && (
                <Video
                  // ref={video}
                  style={styles.video}
                  source={{
                    uri: item?.video.url,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              )}
              <View style={styles.infoSection}>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 20,
                    color: "#000",
                    flex: 1,
                  }}
                >
                  {item?.title}
                </Text>

                <Pressable
                  onPress={() => onChapterComplete(item)}
                  style={styles.markAsCompleted}
                >
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 12,
                      color: Colors.WHITE,
                    }}
                  >
                    Mark as Completed
                  </Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.contentSection,
                  { backgroundColor: Colors.WHITE },
                ]}
              >
                <Text style={{ fontFamily: "outfit-semibold", fontSize: 15 }}>
                  Content:
                </Text>
                <Text style={{ color: Colors.BLACK }}>{item?.content}</Text>
              </View>
              <View style={styles.contentSection}>
                <Text style={{ color: Colors.BLACK }}>{item?.output}</Text>
              </View>
              <TouchableOpacity
                onPress={() => nextPage(index)}
                style={styles.nextBtn}
              >
                <Text
                  style={{
                    color: Colors.WHITE,
                    textAlign: "center",
                    fontFamily: "outfit-semibold",
                    fontSize: 16,
                  }}
                >
                  {course?.chapter?.length <= index + 1 ? "Finish" : "Next"}
                </Text>
              </TouchableOpacity>
              {/* <LessonsSection
                course={course}
                isEnrolled={userEnrollment}
                onChapterSelect={(index) => scrollToIndex(index)}
                selectedChapter={item}
              /> */}
            </View>
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
        />
        {isSidebarOpen && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <Sidebar
              course={course}
              isEnrolled={userEnrollment}
              onChapterSelect={(index) => scrollToIndex(index)}
              selectedChapter={course?.chapter[activeIndex]}
              onClose={() => setIsSidebarOpen(false)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChapterContent;

const styles = StyleSheet.create({
  video: {
    width: "98%",
    alignSelf: "center",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  infoSection: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  markAsCompleted: {
    padding: 5,
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: 8,
  },
  contentSection: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: "#cbcbcb",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  nextBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

const tagstyle = {
  body: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  code: {
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
  },
};
