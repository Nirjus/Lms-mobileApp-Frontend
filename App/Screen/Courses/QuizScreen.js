import {
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../Components/Common/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Quiz from "../../Components/Course/Quiz";

const QuizScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
            chapterID: params?.chapter?._id,
            chapterTitle: params?.chapter?.title,
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
          setUserInfo(res.data.user);
          if (course?.chapter?.length === res.data.chapterLength) {
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        title={`Quiz`}
        isLeft
        component={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={35} color="black" />
          </TouchableOpacity>
        }
      />
      <Quiz
        quiz={params?.chapter?.quiz}
        onChapterComplete={() => onChapterComplete()}
      />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
