import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CourseLebelItem from "../../Components/Course/CourseLebelItem";
import axios from "axios";
import SectionHeading from "../../Components/SectionHeading";
import Loader from "../../Components/Loader";
import Colors from "../../utils/Colors";

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
      <View
        style={{ height: 180, backgroundColor: Colors.PRIMARY, padding: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Feather
            name="search"
            size={25}
            color="white"
            onPress={() => navigation.navigate("Search")}
          />
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: Colors.WHITE,
              fontSize: 30,
              textAlign: "center",
            }}
          >
            All Courses
          </Text>
          <View style={{ width: 25 }} />
        </View>
      </View>
      <View
        style={{
          marginTop: -50,
          flex: 1,
          marginBottom: 70,
        }}
      >
        <View>
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
        </View>
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default Courses;
