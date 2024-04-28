import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../Components/Header";
import Colors from "../../utils/Colors";
import CategoryList from "../../Components/Category/CategoryList";
import CourseList from "../../Components/Course/CourseList";
import SectionHeading from "../../Components/SectionHeading";
import CourseLebelItem from "../../Components/Course/CourseLebelItem";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const [courseLevel, setCourseLevel] = useState([
    { label: "Basic", value: "easy" },
    { label: "Standerd", value: "medium" },
    { label: "Hard", value: "hard" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        await axios
          .get("/category/getAll-category")
          .then((res) => {
            setCategoryList(res.data.categories);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getAllCategory();
  }, []);
  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const { data } = await axios.get(
          `/course/getAll-courses?courseLevel=${value}`
        );
        setCourseList(data.courses);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getAllCourse();
  }, [value]);
  useEffect(() => {
    const getAllCourse = async () => {
      try {
        await axios
          .get("/course/getTop-courses")
          .then((res) => {
            setTopCourses(res.data.courses);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getAllCourse();
  }, []);
  useEffect(() => {
    const getAllCourse = async () => {
      try {
        await axios
          .get("/course/get-Free-courses")
          .then((res) => {
            setFreeCourses(res.data.courses);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getAllCourse();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 40, backgroundColor: Colors.PRIMARY }} />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header user={user} />
        </View>
        {/* {Category list} */}
        <View style={{ marginTop: -80 }}>
          <CategoryList categorylist={categoryList} />
        </View>
        {/* {CourseList} */}
        <View style={{ marginBottom: 2 }}>
          <SectionHeading title={"Popular Courses"} size={20} />
          <CourseList courses={topCourses} />
        </View>
        <View style={{ marginBottom: 2 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 15,
                paddingVertical: 10,
                width: 200,
              }}
            >
              <DropDownPicker
                open={open}
                value={value}
                items={courseLevel}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setCourseLevel}
                placeholder={"Choose Level"}
              />
            </View>
            <AntDesign name="arrowright" size={22} color="black" />
          </View>
          <CourseList courses={courseList} />
        </View>
        <View style={{ marginBottom: 100, marginTop: 5 }}>
          <SectionHeading title={"Free Courses"} size={20} />
          <View>
            <FlatList
              data={freeCourses}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CourseLebelItem item={item} key={item._id} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 250,
    marginTop: -10,
  },
});
