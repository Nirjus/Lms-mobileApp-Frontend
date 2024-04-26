import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../Components/Common/Header";
import CourseLebelItem from "../Components/Course/CourseLebelItem";

const CategoryPage = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const getAllCourse = async () => {
    setLoading(true);
    try {
      await axios
        .get(`course/getAll-courses?category=${params?.data?.name}`)
        .then((res) => {
          setLoading(false);
          setProductList(res.data.courses);
        })
        .catch((error) => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourse();
  }, [params]);
  console.log(params?.data);
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
      <View style={styles.iconBAr}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: params.data?.icon?.url }}
            style={styles.iconImage}
          />
          <Text style={styles.iconTitle}>{params.data?.name}</Text>
        </View>
      </View>
      <FlatList
        data={productList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={() => getAllCourse()}
        renderItem={({ item, index }) => (
          <CourseLebelItem item={item} key={item._id} />
        )}
      />
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  iconContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  iconBAr: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  iconTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7a18b8",
    textTransform: "capitalize",
    fontStyle: "italic",
  },
});
