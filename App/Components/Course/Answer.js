import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { useDispatch } from "react-redux";
import axios from "axios";

const Answer = ({ item, token, chapter, course }) => {
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubminAnswer = async (questionId) => {
    try {
      setLoading(true);
      if (!answer) {
        setLoading(false);
        return;
      }
      await axios
        .put(
          `/course/add-answer/${course?._id}?chapterId=${chapter?._id}&questionId=${questionId}`,
          {
            answer,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setAnswer("");
          setLoading(false);
          setShow(true);
          dispatch({
            type: "INIT_COURSE",
          });
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
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={[{ width: "10%" }, !show && { position: "absolute" }]}>
          {show ? (
            <Entypo
              name="chevron-small-up"
              size={26}
              color="black"
              onPress={() => setShow(false)}
            />
          ) : (
            <Entypo
              name="chevron-small-down"
              size={26}
              color="black"
              onPress={() => setShow(true)}
            />
          )}
        </View>
        <View style={{ width: "90%" }}>
          {show && (
            <FlatList
              data={item?.answers}
              renderItem={({ item, index }) => (
                <View
                  key={item?._id}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                    paddingRight: 5,
                    marginVertical: 3,
                    alignSelf: "flex-end",
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
                        ? { backgroundColor: "#f783ac" }
                        : { backgroundColor: "#fbac81" },
                    ]}
                  >
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontFamily: "outfit-bold",
                        fontSize: 15,
                      }}
                    >
                      {item?.userName.substring(0, 1)}
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
                      {item?.userName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                        color: Colors.BLACK,
                      }}
                    >
                      {item?.answer}
                    </Text>
                    <Text style={{ fontSize: 11, color: "#868686" }}>
                      {formatDate(item?.create)}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
      {/* Answer Input */}
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          placeholder="Write your answer"
          placeholderTextColor={"#b4b4b4"}
          value={answer}
          multiline
          onChangeText={(txt) => setAnswer(txt)}
          style={{
            width: "85%",
            borderBottomWidth: 2,
            borderBottomColor: "#c1c1c1",
            padding: 5,
            paddingRight: 30,
            color: Colors.BLACK,
          }}
        />
        <MaterialCommunityIcons
          onPress={() => handleSubminAnswer(item?._id)}
          disabled={loading}
          name="send-circle-outline"
          size={25}
          color="black"
          style={{ marginLeft: -30, marginRight: 10 }}
        />
      </View>
    </View>
  );
};

export default Answer;

const styles = StyleSheet.create({});
