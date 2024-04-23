import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import CourseItem from "./CourseItem";

const CourseList = ({ courses, title }) => {
  return (
    <View>
      <FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CourseItem item={item} key={item._id} />
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
