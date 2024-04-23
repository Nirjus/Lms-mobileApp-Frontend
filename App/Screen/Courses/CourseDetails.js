import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import RazorpayCheckout from "react-native-razorpay";
import Header from "../../Components/Common/Header";
import CourseInfo from "../../Components/Course/CourseInfo";
import SourceSection from "../../Components/Course/SourceSection";
import EnrollCourse from "../../Components/Course/EnrollCourse";
import LessonsSection from "../../Components/Course/LessonsSection";
import Loader from "../../Components/Loader";

const CourseDetails = () => {
  const { params } = useRoute();

  const [loading, setLoading] = useState(false);

  const [isEnrolled, setEnrolled] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { isMember: memberExists } = useSelector((state) => state.member);
  const [course, setCourse] = useState();
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    setCourse(params.data);
  }, [params]);

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

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Course Details"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseInfo course={course} />
        {/* {Sourse section} */}
        {!isMember && <SourceSection isMember={isMember} />}
        {/* {Course conrollment} */}
        <EnrollCourse
          course={course}
          isEnrolled={isEnrolled}
          isMember={isMember}
          checkEnrollingOfCourse={checkEnrollingOfCourse}
        />
        {/* {Lessons Sections} */}
        <LessonsSection course={course} isEnrolled={isEnrolled} />
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
