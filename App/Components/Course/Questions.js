import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../utils/Colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import Answer from "./Answer";

const Questions = ({ user, token, chapter, course }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };

  const addQuestion = async () => {
    try {
      setLoading(true);
      if (!question) {
        setLoading(false);
        return;
      }
      await axios
        .put(
          `/course/add-question/${course?._id}?chapterId=${chapter?._id}`,
          {
            question,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          dispatch({
            type: "INIT_COURSE",
          });
          setQuestion("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
          paddingRight: 5,
        }}
      >
        {user?.avatar?.url ? (
          <Image
            source={{ uri: user?.avatar?.url }}
            style={{ width: 40, height: 40, borderRadius: 99 }}
          />
        ) : (
          <Image
            source={require("../../../assets/images/pngegg.png")}
            style={{ width: 40, height: 40, borderRadius: 99 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Whight your Question.."
            style={{
              padding: 10,
              backgroundColor: "#e7e7e7",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#c3c3c3",
            }}
            multiline
            numberOfLines={2}
            value={question}
            onChangeText={(txt) => setQuestion(txt)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 5,
          borderBottomColor: "#c6c6c6",
          paddingTop: 10,
          paddingRight: 5,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => addQuestion()}
          disabled={loading}
          style={styles.btn}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: "outfit-bold",
              fontSize: 14,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={chapter?.qna}
          renderItem={({ item, index }) => (
            <View key={item?._id}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                  paddingRight: 5,
                  marginVertical: 5,
                }}
              >
                <View
                  style={[
                    {
                      width: 40,
                      height: 40,
                      borderRadius: 99,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    index % 2 === 0
                      ? { backgroundColor: "#c386f8" }
                      : { backgroundColor: "#7df8cd" },
                  ]}
                >
                  <Text
                    style={{
                      color: Colors.WHITE,
                      fontFamily: "outfit-bold",
                      fontSize: 15,
                    }}
                  >
                    {item?.name.substring(0, 1)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#e7e7e7",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      color: Colors.BLACK,
                      fontSize: 15,
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text style={{ fontFamily: "outfit", color: Colors.BLACK }}>
                    {item?.question}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#868686" }}>
                    {formatDate(item?.createdAt)}
                  </Text>
                </View>
              </View>
              <Answer
                item={item}
                token={token}
                chapter={chapter}
                course={course}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
});
