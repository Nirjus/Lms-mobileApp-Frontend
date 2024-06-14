import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, AntDesign } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Common/Header";
import Colors from "../../utils/Colors";
import ProgressBar from "../../Components/Course/progressBar";
import Sidebar from "../../Components/Course/Sidebar";
import Questions from "../../Components/Course/Questions";

const ChapterContent = () => {
  const { params } = useRoute();
  const { token, user } = useSelector((state) => state.user);
  const { enrollData } = useSelector((state) => state.enroll);
  const { width } = useWindowDimensions();
  const {
    course,
    chapterProgressIndex,
    update: courseUpdate,
  } = useSelector((state) => state.course);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [chapter, setChapter] = useState(params?.chapter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (course) {
      const findChapter = course?.chapter?.find(
        (ch) => ch._id === params?.chapter?._id
      );
      setChapter(findChapter);
    }
  }, [courseUpdate, params]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const setUserInfo = async (data) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data));

    dispatch({
      type: "LOAD_USER",
      user: data,
      token: token,
    });
  };
  const onChapterComplete = async () => {
    try {
      await axios
        .put(
          `/enroll/chapter-complete?courseId=${course?._id}`,
          {
            chapterID: chapter?._id,
            chapterTitle: chapter?.title,
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
            setUserInfo(res.data.user);
            navigation.navigate("CourseCompletionSuccess");
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
  const isComplete = () => {
    return enrollData?.completedChapter?.some(
      (item) => item?.chapterID === chapter?._id
    );
  };

  const nextPage = () => {
    const index = course?.chapter?.findIndex(
      (item) => item._id === chapter?._id
    );
    if (course?.chapter?.length <= index + 1) {
      navigation.navigate("CourseDetails", { data: course });
      return;
    }
    const item = course?.chapter[index + 1];
    if (!params?.isEnrolled && !item?.isFree) {
      alert("Next chapter is not free, Please Enroll Course!");
    } else {
      dispatch({
        type: "SET_INDEX",
        payload: index + 1,
      });
      navigation.navigate("ChapterContent", {
        chapter: item,
        isEnrolled: params?.isEnrolled,
      });
    }
  };
  const prevPage = () => {
    const index = course?.chapter?.findIndex(
      (item) => item._id === chapter?._id
    );
    if (index <= 0) {
      return;
    }
    const item = course?.chapter[index - 1];
    if (!params?.isEnrolled && !item?.isFree) {
      alert("Previous chapter is not free, Please Enroll Course!");
    } else {
      dispatch({
        type: "SET_INDEX",
        payload: index - 1,
      });
      navigation.navigate("ChapterContent", {
        chapter: item,
        isEnrolled: params?.isEnrolled,
      });
    }
  };
  const quizeNavigation = () => {
    if (!params?.isEnrolled) {
      Alert.alert(
        "Course not enrolled",
        "you have to purchased the course in order to attempting the quizzes.",
        [
          {
            text: "ok",
            onPress: () => {
              navigation.navigate("CourseDetails", { data: course });
            },
          },
          {
            text: "cancel",
            onPress: () => {},
          },
        ]
      );
    } else {
      navigation.navigate("QuizScreen", {
        chapter: chapter,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Chapters`}
        isLeft
        component={
          <TouchableOpacity activeOpacity={0.5} onPress={() => toggleSidebar()}>
            <Feather name="sidebar" size={25} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar
          contentLength={course?.chapter?.length}
          contentIndex={chapterProgressIndex}
        />
        <View
          style={{
            width: Dimensions.get("screen").width,
            minHeight: Dimensions.get("screen").height - 120,
            position: "relative",
          }}
        >
          <Video
            // ref={video}
            style={styles.video}
            source={{
              uri: chapter?.video.url,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.infoSection}>
            <Text
              style={{
                fontFamily: "outfit-semibold",
                fontSize: 18,
                color: "#000",
                flex: 1,
              }}
            >
              {chapter?.title}
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => prevPage()}
                style={[
                  styles.nextBtn,
                  course?.chapter[0]._id === chapter?._id && {
                    opacity: 0.7,
                  },
                ]}
              >
                <Feather name="arrow-left-circle" size={24} color="#686767" />
              </TouchableOpacity>
              {params?.isEnrolled && (
                <>
                  {chapter?.quiz?.length === 0 && !isComplete() && (
                    <Pressable
                      onPress={() => onChapterComplete()}
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
                  )}
                  {isComplete() && (
                    <Pressable
                      onPress={() => {}}
                      style={[
                        styles.markAsCompleted,
                        { backgroundColor: "#cefcdb", flexDirection: "row" },
                      ]}
                    >
                      <AntDesign
                        name="checkcircleo"
                        size={20}
                        color="#1eca46"
                      />
                      <Text
                        style={{
                          fontFamily: "outfit",
                          fontSize: 13,
                          color: "#1eca46",
                        }}
                      >
                        Completed
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
              <TouchableOpacity
                onPress={() => nextPage()}
                style={styles.nextBtn}
              >
                {course?.chapter[course?.chapter?.length - 1]._id ===
                chapter?._id ? (
                  <Text
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontFamily: "outfit-semibold",
                      fontSize: 15,
                    }}
                  >
                    Finish
                  </Text>
                ) : (
                  <Feather
                    name="arrow-right-circle"
                    size={24}
                    color="#686767"
                  />
                )}
              </TouchableOpacity>
            </View>

            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                style={[
                  styles.btn,
                  page === 1
                    ? {
                        borderBottomWidth: 2,
                        borderBottomColor: "#727272",
                      }
                    : {
                        borderBottomWidth: 0,
                      },
                ]}
                onPress={() => setPage(1)}
              >
                <Text style={styles.txt}>Overview</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btn,
                  page === 2
                    ? {
                        borderBottomWidth: 2,
                        borderBottomColor: "#727272",
                      }
                    : {
                        borderBottomWidth: 0,
                      },
                ]}
                onPress={() => setPage(2)}
              >
                <Text style={styles.txt}>Discuss</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btn,
                  page === 3
                    ? {
                        borderBottomWidth: 2,
                        borderBottomColor: "#727272",
                      }
                    : {
                        borderBottomWidth: 0,
                      },
                ]}
                onPress={() => setPage(3)}
              >
                <Text style={styles.txt}>Quiz</Text>
              </Pressable>
            </Pressable>

            {page === 1 && (
              <View>
                <View
                  style={[
                    styles.contentSection,
                    { backgroundColor: Colors.WHITE },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-semibold",
                      fontSize: 15,
                    }}
                  >
                    Content:
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: chapter?.content }}
                    tagsStyles={tagstyle}
                  />
                </View>
                <View style={styles.contentSection}>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: chapter?.output }}
                    tagsStyles={tagstyle}
                  />
                </View>
              </View>
            )}
            {page === 2 && (
              <View>
                <Questions
                  user={user}
                  token={token}
                  chapterId={chapter?._id}
                  courseId={course?._id}
                />
              </View>
            )}
            {page === 3 && (
              <View
                style={{
                  padding: 10,
                  backgroundColor: Colors.WHITE,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}
              >
                {chapter?.quiz?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      marginVertical: 20,
                      fontStyle: "italic",
                    }}
                  >
                    No quiz have in this chapter
                  </Text>
                ) : (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      You have to carefully watch thie video tutorial, before
                      attempt the quizzes,
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#dadada",
                        marginVertical: 20,
                      }}
                    />
                    <Text style={{ fontSize: 13, color: "#626262" }}>
                      You have to successfully attempts {chapter?.quiz?.length}{" "}
                      quiz to complete this chapter
                    </Text>
                    <TouchableOpacity
                      style={styles.quizButton}
                      onPress={() => quizeNavigation()}
                    >
                      <Text
                        style={{
                          color: Colors.WHITE,
                          textAlign: "center",
                          fontFamily: "outfit-semibold",
                          fontSize: 15,
                        }}
                      >
                        Lets start
                      </Text>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={Colors.WHITE}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

        {isSidebarOpen && (
          <Sidebar
            course={course}
            isEnrolled={params?.isEnrolled}
            onClose={() => setIsSidebarOpen(false)}
          />
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
    backgroundColor: "#8491fe",
    height: 40,
    justifyContent: "center",
    columnGap: 10,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: "#cbcbcb",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  nextBtn: {
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    margin: 10,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 100,
    padding: 8,
    borderBottomWidth: 0,
  },
  txt: {
    fontFamily: "outfit",
    fontSize: 15,
    textAlign: "center",
    color: Colors.BLACK,
  },
  quizButton: {
    padding: 10,
    width: 150,
    backgroundColor: "#7d81fb",
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
});

const tagstyle = {
  body: {
    fontFamily: "outfit",
  },
  code: {
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
  },
};
