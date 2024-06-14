import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(0);
  const { isMember: reduxMember } = useSelector((state) => state.member);
  const { update } = useSelector((state) => state.enroll);
  const [isEnrolled, setEnrolled] = useState(false);
  const { token } = useSelector((state) => state.user);
  const [course, setCourse] = useState(params?.data);
  const [isMember, setIsMember] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        await axios
          .get(`/course/getCourse/${params?.data?._id}`)
          .then((res) => {
            setCourse(res.data.course);
            dispatch({
              type: "INIT_COURSE",
              payload: res.data.course,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [params]);

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
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    checkMemberShip();
  }, [reduxMember]);
  useEffect(() => {
    const checkCompleteChapter = async () => {
      try {
        await axios
          .get(`/enroll/check-complete/${course?._id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            dispatch({
              type: "ADD_ENROLLMENT",
              payload: res.data.enrolledCours,
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.error(error);
      }
    };
    checkCompleteChapter();
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
            price: price,
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
          amount: price * 100,
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
            navigation.navigate("Review", {
              course: course,
            });
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
        <CourseInfo course={course} isEnrolled={isEnrolled} />
        {/* {Sourse section} */}
        {!isMember && <SourceSection isMember={isMember} />}
        {/* {Course conrollment} */}
        <EnrollCourse
          coursePrice={course?.price}
          isEnrolled={isEnrolled}
          setPrice={setPrice}
          continueOnCourse={() => {
            navigation.navigate("ChapterContent", {
              chapter: course?.chapter[0],
              isEnrolled: isEnrolled,
            });
            dispatch({
              type: "SET_INDEX",
              payload: 0,
            });
          }}
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
          <LessonsSection course={course} isEnrolled={isEnrolled} />
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
