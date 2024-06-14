import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../../Components/Common/Header";
import Colors from "../../utils/Colors";
import { durationToMinute, minutesToDuration } from "../../utils/timeHandler";
import BannerModel from "../../Components/Common/modal/bannerModel";

const CourseProgress = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = useSelector((state) => state.user);

  const course = params?.data?.item;
  const completedChapter = params?.data?.completedChapter;
  const paymentInfo = params?.data?.paymentInfo;

  const checkCompleteChapter = (chapterId) => {
    return completedChapter?.some((item) => item?.chapterID === chapterId);
  };
  const calculatePerComplete = () => {
    const persentage = completedChapter?.length / course?.chapter?.length;

    return persentage.toFixed(2);
  };
  const isReviewd = () => {
    return course?.reviews?.some(
      (item) => item?.userId?.toString() === user?._id
    );
  };

  const questionSolved = () => {
    let totalQuestion = 0;
    let solvedQuestion = 0;
    completedChapter.forEach((item) => {
      course?.chapter?.forEach((ch) => {
        if (item?.chapterID === ch._id) {
          const quizLength = ch?.quiz?.length;
          solvedQuestion += quizLength;
        }
      });
    });
    course?.chapter?.forEach((ch) => {
      totalQuestion += ch?.quiz?.length;
    });
    return {
      totalQuestion,
      solvedQuestion,
    };
  };
  const timeUse = () => {
    let usedTime = 0;
    completedChapter.forEach((item) => {
      course?.chapter?.forEach((ch) => {
        if (item?.chapterID === ch._id) {
          const videoLength = durationToMinute(ch?.video?.duration);
          usedTime += videoLength;
        }
      });
    });
    const totalTime = durationToMinute(course?.time);

    return {
      usedTime: minutesToDuration(usedTime),
      totalTime: course?.time,
      timePercentage: (usedTime / totalTime).toFixed(2),
    };
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Course Activity"}
        isLeft
        component={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={40} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <BannerModel
          isCompleted={completedChapter?.length === course?.chapter?.length}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <View style={styles.ongoingCourseInfo}>
            <Octicons name="checklist" size={22} color="#343434" />
            <View>
              <Text style={{ fontFamily: "outfit", fontSize: 13 }}>Total</Text>
              <Text
                style={{ fontFamily: "outfit", fontSize: 13, marginLeft: 6 }}
              >
                {course?.chapter?.length}
              </Text>
            </View>
          </View>
          <View style={styles.ongoingCourseInfo}>
            <Feather name="check-circle" size={23} color="#1ec86a" />
            <View>
              <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
                Complete
              </Text>
              <Text
                style={{ fontFamily: "outfit", fontSize: 13, marginLeft: 6 }}
              >
                {completedChapter?.length}
              </Text>
            </View>
          </View>
          <View style={styles.ongoingCourseInfo}>
            <MaterialCommunityIcons
              name="progress-clock"
              size={26}
              color="#4863f9"
            />
            <View>
              <Text style={{ fontFamily: "outfit", fontSize: 13 }}>Rest</Text>
              <Text
                style={{ fontFamily: "outfit", fontSize: 13, marginLeft: 6 }}
              >
                {course?.chapter?.length - completedChapter?.length}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: Colors.WHITE,
            padding: 10,
            marginHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={calculatePerComplete() * 100}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#879aaf"
          >
            {(fill) => (
              <View>
                <Text
                  style={{
                    color: "#717171",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Complete
                </Text>
                <Text
                  style={{ fontFamily: "outfit-semibold", textAlign: "center" }}
                >
                  {calculatePerComplete() * 100}%
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
              Total time: {timeUse().totalTime}
            </Text>

            <Text
              style={{ fontFamily: "outfit", fontSize: 13, marginBottom: 5 }}
            >
              Spend time: {timeUse().usedTime}
            </Text>
            <AnimatedCircularProgress
              size={80}
              width={10}
              fill={timeUse().timePercentage * 100}
              tintColor="#fa5ba8"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#a87e9e"
            >
              {(fill) => (
                <View>
                  <Text
                    style={{
                      color: "#717171",
                      fontSize: 11,
                      textAlign: "center",
                    }}
                  >
                    Spend
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit-semibold",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    {timeUse().timePercentage * 100}%
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
        <View style={{}}>
          {course &&
            course?.chapter?.map((item, index) => {
              const isCompleted = checkCompleteChapter(item?._id);
              return (
                <View
                  key={item?._id}
                  style={[
                    styles.lesson,
                    isCompleted
                      ? { backgroundColor: "#e3fee9" }
                      : { backgroundColor: Colors.WHITE },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
                      {index + 1}
                    </Text>
                    <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
                      {item?.title?.length > 30
                        ? item?.title?.substr(0, 30) + ".."
                        : item?.title}
                    </Text>
                  </View>
                  {isCompleted ? (
                    <Feather name="check-circle" size={21} color="#17c364" />
                  ) : (
                    <MaterialCommunityIcons
                      name="progress-clock"
                      size={24}
                      color="#4863f9"
                    />
                  )}
                </View>
              );
            })}
        </View>
        <View
          style={{
            paddingLeft: 20,
            borderRadius: 10,
            backgroundColor: Colors.WHITE,
            paddingTop: 15,
            padding: 10,
            marginHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontFamily: "outfit-semibold", fontSize: 16 }}>
            Total question: {questionSolved().totalQuestion}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 14,
              color: "#7b7b7b",
              marginLeft: 10,
            }}
          >
            Solved : {questionSolved().solvedQuestion}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("CourseDetails", { data: course });
          }}
        >
          <Text style={{ fontFamily: "outfit-bold", color: Colors.WHITE }}>
            Go to Course
          </Text>
        </TouchableOpacity>
        {!isReviewd() && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Review", { course });
            }}
            style={[
              styles.btn,
              {
                borderColor: "#f85454",
                borderWidth: 2,
                backgroundColor: Colors.WHITE,
                paddingVertical: 10,
              },
            ]}
          >
            <Feather name="alert-triangle" size={20} color="#f85454" />
            <Text style={{ fontFamily: "outfit-bold", color: "#f85454" }}>
              Give a review
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            padding: 10,
            backgroundColor: Colors.WHITE,
            marginBottom: 10,
            borderRadius: 10,
            rowGap: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: 16,
            }}
          >
            Payment Info
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontFamily: "outfit", color: "#545454", fontSize: 13 }}
            >
              PaymentMode: {paymentInfo?.paymentMode}
            </Text>
            <Text
              style={{ fontFamily: "outfit", color: "#545454", fontSize: 13 }}
            >
              Value: ₹{paymentInfo?.price}.00
            </Text>
          </View>
          <Text
            style={{ fontFamily: "outfit", color: "#545454", fontSize: 13 }}
          >
            PaymentId: {paymentInfo?.paymentId}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  lesson: {
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 99,
  },
  ongoingCourseInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#6f68fc",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
