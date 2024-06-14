import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../Components/Common/Header";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import ProgressCourse from "../../Components/Course/ProgressCourse";

const MyCourses = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const { update } = useSelector((state) => state.enroll);
  const [myCourses, setMyCourses] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const getAllEnrollCourses = async () => {
    try {
      setIsLoading(true);
      await axios
        .get("/enroll/getAll-enroll-course", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setMyCourses(res.data.enrolledCourse);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEnrollCourses();
  }, [update]);
  const calculateProgress = () => {
    let inProgress = 0;
    let completed = 0;
    myCourses.length !== 0 &&
      myCourses.forEach((item) => {
        if (item?.course?.chapter?.length === item?.completedChapter?.length) {
          completed++;
        } else {
          inProgress++;
        }
      });

    return {
      inProgress,
      completed,
    };
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"My Courses"}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginVertical: 10,
        }}
      >
        <View style={styles.ongoingCourseInfo}>
          <MaterialCommunityIcons
            name="progress-clock"
            size={26}
            color="#4863f9"
          />
          <View>
            <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
              In progress
            </Text>
            <Text style={{ fontFamily: "outfit", fontSize: 13, marginLeft: 6 }}>
              {calculateProgress().inProgress}
            </Text>
          </View>
        </View>
        <View style={styles.ongoingCourseInfo}>
          <Feather name="check-circle" size={23} color="#1ec86a" />
          <View>
            <Text style={{ fontFamily: "outfit", fontSize: 13 }}>
              Completed
            </Text>
            <Text style={{ fontFamily: "outfit", fontSize: 13, marginLeft: 6 }}>
              {calculateProgress().completed}
            </Text>
          </View>
        </View>
      </View>
      {myCourses?.length === 0 && (
        <Text
          style={{
            textAlign: "center",
            marginVertical: 10,
            fontSize: 16,
            fontFamily: "outfit",
          }}
        >
          No enrolled course
        </Text>
      )}

      <FlatList
        data={myCourses}
        refreshing={isloading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => getAllEnrollCourses()}
        renderItem={({ item, index }) => (
          <ProgressCourse
            item={item?.course}
            completedChapter={item?.completedChapter}
            paymentInfo={item?.paymentInfo}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default MyCourses;

const styles = StyleSheet.create({
  ongoingCourseInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
});
