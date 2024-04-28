import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import CourseLebelItem from "../Components/Course/CourseLebelItem";

const Search = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState(1);
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const getAllCourse = async () => {
    try {
      await axios
        .get(
          `/course/getAll-courses?keyWord=${keyword}&tags=${tags}&category=${category}`
        )
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourse();
  }, [keyword, tags, category]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.contaner}>
        <Ionicons
          name="arrow-back-circle"
          size={35}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.inputContainer}>
          <AntDesign name="search1" size={24} color="#545454" />
          {option === 1 && (
            <TextInput
              placeholder="Search Course"
              placeholderTextColor={"#9f9f9f"}
              style={styles.input}
              value={keyword}
              onChangeText={(txt) => setKeyword(txt)}
            />
          )}
          {option === 2 && (
            <TextInput
              placeholder="Search Course"
              placeholderTextColor={"#9f9f9f"}
              style={styles.input}
              value={tags}
              onChangeText={(txt) => setTags(txt)}
            />
          )}
          {option === 3 && (
            <TextInput
              placeholder="Search Course"
              placeholderTextColor={"#9f9f9f"}
              style={styles.input}
              value={category}
              onChangeText={(txt) => setCategory(txt)}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingBottom: 10,
          backgroundColor: Colors.WHITE,
          borderBottomWidth: 0.5,
          borderBottomColor: "#cacaca",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="filter" size={24} color="black" />
          <Text style={styles.txtStyle}>Search by</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: option === 1 ? "#5f5f5f" : "#c4c4c4" },
            ]}
            onPress={() => {
              setOption(1);
              setTags("");
              setCourses("");
            }}
          >
            <Text
              style={[
                styles.txtStyle,
                { color: option === 1 ? Colors.WHITE : Colors.BLACK },
              ]}
            >
              Keyword
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: option === 2 ? "#5f5f5f" : "#c4c4c4" },
            ]}
            onPress={() => {
              setOption(2);
              setKeyword("");
              setCategory("");
            }}
          >
            <Text
              style={[
                styles.txtStyle,
                { color: option === 2 ? Colors.WHITE : Colors.BLACK },
              ]}
            >
              Tags
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: option === 3 ? "#5f5f5f" : "#c4c4c4" },
            ]}
            onPress={() => {
              setOption(3);
              setKeyword("");
              setTags("");
            }}
          >
            <Text
              style={[
                styles.txtStyle,
                { color: option === 3 ? Colors.WHITE : Colors.BLACK },
              ]}
            >
              Category
            </Text>
          </Pressable>
        </View>
      </View>
      {courses &&
        courses.length !== 0 &&
        (keyword.length !== 0 ||
          tags.length !== 0 ||
          category.length !== 0) && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={courses}
              renderItem={({ item, index }) => (
                <CourseLebelItem item={item} key={item?._id} />
              )}
            />
          </View>
        )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  contaner: {
    backgroundColor: Colors.WHITE,
    height: 120,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#ededed",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    flex: 1,
    paddingLeft: 4,
    color: "#000",
    fontFamily: "outfit",
  },
  btn: {
    padding: 5,
    backgroundColor: "#c4c4c4",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#8b8b8b",
  },
  txtStyle: {
    fontFamily: "outfit",
    color: Colors.BLACK,
    fontSize: 13,
  },
});
