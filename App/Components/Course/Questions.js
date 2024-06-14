import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Answer from "./Answer";
import Colors from "../../utils/Colors";
const { height } = Dimensions.get("window");
const Questions = ({ user, token, chapterId, courseId }) => {
  const [question, setQuestion] = useState("");
  const [qnaArray, setQnaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  useEffect(() => {
    const getAllQnaOfAChapter = async () => {
      try {
        await axios
          .get(`/qna/getAllQna/${courseId}?chapterId=${chapterId}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setQnaArray(res.data?.chapterQna?.questions);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getAllQnaOfAChapter();
  }, [chapterId]);
  const addQuestion = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          `/qna/add-question`,
          {
            courseId,
            chapterId,
            questionString: question,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setQnaArray(res.data?.chapterQna?.questions);
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
    <View style={{ flex: 1, padding: 10 }}>
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
          data={qnaArray}
          style={{ maxHeight: height / 2 }}
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
                  <Text style={{ fontFamily: "outfit", color: Colors.BLACK }}>
                    {item?.questionString}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#868686" }}>
                    {formatDate(item?.create)}
                  </Text>
                </View>
              </View>
              <Answer
                item={item}
                setQnaArray={setQnaArray}
                token={token}
                chapterId={chapterId}
                courseId={courseId}
              />
            </View>
          )}
          nestedScrollEnabled
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
