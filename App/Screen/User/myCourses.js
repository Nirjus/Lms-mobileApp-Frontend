import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../Components/Common/Header";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import ProgressCourse from "../../Components/Course/ProgressCourse";

const MyCourses = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
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
          setMyCourses(res.data.enrolledCourses);
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
  }, []);
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
      <FlatList
        data={myCourses}
        refreshing={isloading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => getAllEnrollCourses()}
        renderItem={({ item, index }) => (
          <ProgressCourse
            item={item?.course}
            completedChapter={item?.completedChapter}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default MyCourses;

const styles = StyleSheet.create({});
