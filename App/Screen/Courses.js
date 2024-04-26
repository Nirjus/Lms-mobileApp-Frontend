import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Common/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CourseLebelItem from "../Components/Course/CourseLebelItem";
import axios from "axios";
import SectionHeading from "../Components/SectionHeading";
import Loader from "../Components/Loader";

const Courses = () => {
  const navigation = useNavigation();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/course/getAll-courses`);
      setLoading(false);
      setCourseList(data.courses);
    } catch (error) {
      alert(error);
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Courses"}
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
      <SectionHeading title={"All Courses"} size={20} />
      {courseList.length !== 0 && (
        <FlatList
          data={courseList}
          refreshing={loading}
          onRefresh={() => getAllCourses()}
          renderItem={({ item, index }) => (
            <CourseLebelItem item={item} key={item._id} />
          )}
        />
      )}
      <View
        style={{
          paddingBottom: 90,
          backgroundColor: "rgba(255,255,255,0.0)",
          backfaceVisibility: "visible",
        }}
      />
      <Loader visible={loading} />
    </View>
  );
};

export default Courses;
