import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SectionHeading from "../SectionHeading";

const CategoryList = ({ categorylist }) => {
  const [activeCategory, setActiveCategory] = useState();
  return (
    <View>
      <SectionHeading title={"Category"} color="#fff" size={20} />
      <FlatList
        data={categorylist}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            key={item._id}
            style={[
              styles.categoryItem,
              activeCategory === index && {
                elevation: 5,
                backgroundColor: "#efefef",
              },
            ]}
            onPress={() => {
              setActiveCategory(index);
            }}
          >
            <Image
              source={{ uri: item?.icon?.url }}
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
              }}
            />
            <Text style={styles.txt}>{item?.name}</Text>
          </Pressable>
        )}
        // style={{ paddingLeft: 10 }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
  },
  txt: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "outfit",
    textAlign: "center",
    fontWeight: "500",
  },
});
