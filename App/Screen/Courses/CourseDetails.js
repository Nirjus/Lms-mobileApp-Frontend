import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  View,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import Header from "../../Components/Common/Header";
import CourseInfo from "../../Components/Course/CourseInfo";
import SourceSection from "../../Components/Course/SourceSection";
import EnrollCourse from "../../Components/Course/EnrollCourse";
import LessonsSection from "../../Components/Course/LessonsSection";
import Loader from "../../Components/Loader";
import Colors from "../../utils/Colors";
import ReviewSection from "../../Components/Course/ReviewSection";

const CourseDetails = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { update } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEnrolled, setEnrolled] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { isMember: memberExists } = useSelector((state) => state.member);
  const [course, setCourse] = useState(params?.data);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    const getCourse = async () => {
      try {
        await axios
          .get(`/course/getCourse/${params?.data?._id}`)
          .then((res) => {
            setCourse(res.data.course);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [update]);

  useEffect(() => {
    const checkEnrollOrNot = async () => {
      try {
        await axios
          .get(`/enroll/check-enroll?courseId=${params?.data?._id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setEnrolled(res.data.enroll);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    checkEnrollOrNot();
  }, [course, loading]);
  const handleEnrollCourse = async (paymentMode, paymentId) => {
    try {
      setLoading(true);
      await axios
        .post(
          "/enroll/create",
          {
            courseId: course?._id,
            courseName: course?.name,
            course: course,
            price: course?.price,
            paymentMode: paymentMode,
            paymentId: paymentId,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          Alert.alert(res.data.message, "Greate!! you enrolled a new course");
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const returnPrice = () => {
    if (isMember) {
      const price = course?.price - course?.price * 0.7;
      return price;
    }
    return course?.price;
  };
  const checkEnrollingOfCourse = async () => {
    if (course?.price === 0) {
      const paymentId = Date.now();
      const paymentMode = "Free";
      handleEnrollCourse(paymentMode, paymentId);
    } else {
      try {
        const options = {
          description: "Credits towards consultation",
          image: "https://i.imgur.com/3g7nmJC.png",
          currency: "INR",
          key: "rzp_test_hzUg2csoySkyWy", // Your api key
          amount: returnPrice() * 100,
          name: "ELearner",
          prefill: {
            email: "void@razorpay.com",
            contact: "9191919191",
            name: "Razorpay Software",
          },
          theme: { color: "#7450f7" },
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            handleEnrollCourse("Card", data.razorpay_payment_id);
          })
          .catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
      } catch (error) {
        alert(error);
      }
    }
  };
  useEffect(() => {
    const checkMemberShip = async () => {
      try {
        await axios
          .get("/member/check-member", {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setIsMember(res.data.isMember);
          });
      } catch (error) {
        console.log(error);
      }
    };
    checkMemberShip();
  }, [memberExists]);
  const onchapterPress = () => {
    if (!isEnrolled) {
      ToastAndroid.show("Please Enroll Course!", ToastAndroid.LONG);
      return;
    } else {
      navigation.navigate("ChapterContent", {
        course: course,
        isEnrolled: isEnrolled,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Course Details"}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseInfo course={course} />
        {/* {Sourse section} */}
        {!isMember && <SourceSection isMember={isMember} />}
        {/* {Course conrollment} */}
        <EnrollCourse
          course={course}
          isEnrolled={isEnrolled}
          isMember={isMember}
          continueOnCourse={() =>
            navigation.navigate("ChapterContent", {
              course: course,
              isEnrolled: isEnrolled,
            })
          }
          checkEnrollingOfCourse={checkEnrollingOfCourse}
        />
        {/* {Lessons Sections} */}
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
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
            <Text style={styles.txt}>Lessons</Text>
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
            <Text style={styles.txt}>Reviews</Text>
          </Pressable>
        </Pressable>
        {page === 1 && (
          <LessonsSection
            course={course}
            isEnrolled={isEnrolled}
            onChapterSelect={() => onchapterPress()}
          />
        )}
        {page === 2 && <ReviewSection review={course?.reviews} />}
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
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
});
