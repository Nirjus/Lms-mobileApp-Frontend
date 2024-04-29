import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

const Quiz = ({ quiz, onChapterComplete }) => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(quiz[index]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(2);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setQuestions(quiz[index]);
    setSelectedOptionIndex(null); // Reset selected option index when moving to the next question
    setIsCorrect(false); // Reset
  }, [index, quiz]);
  const checkAnswer = (selectedIndex) => {
    if (attempts > 0) {
      const correctIndex = questions.answerIndex;
      setSelectedOptionIndex(selectedIndex);
      if (selectedIndex === correctIndex) {
        setIsCorrect(selectedIndex === correctIndex);
        setScore(score + 1);
        setAttempts(0);
        return;
      }
      setAttempts(attempts - 1);
    }
  };
  const handleNext = () => {
    if (index + 1 < quiz.length) {
      setIndex(index + 1);
      setSelectedOptionIndex(null);
      setIsCorrect(false);
      setAttempts(2);
    } else {
      setResult(true);
      setAttempts(2);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setIsCorrect(false);
    setResult(false);
  };
  const handleFinish = () => {
    onChapterComplete();
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {result ? (
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "outfit-bold",
                paddingLeft: 10,
                marginBottom: 20,
              }}
            >
              {" "}
              You Scored {score} out of {quiz?.length}
            </Text>
            <TouchableOpacity
              onPress={() => handleReset()}
              style={styles.nextBtn}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "outfit-semibold",
                  fontSize: 15,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", margin: 10, fontSize: 15 }}>
              ----or----
            </Text>
            <TouchableOpacity
              onPress={() => handleFinish()}
              style={styles.nextBtn}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "outfit-semibold",
                  fontSize: 15,
                }}
              >
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.question}>
              {index + 1}. {questions?.question}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 12,
                color: "#6b6b6b",
                marginBottom: 10,
              }}
            >
              You have {attempts} attemts left
            </Text>
            {questions?.options?.map((qn, i) => (
              <Pressable
                onPress={(item) => checkAnswer(i)}
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      selectedOptionIndex === i
                        ? isCorrect
                          ? "#dbfff0" // Green if selected option is correct
                          : "#ffe8e8" // Red if selected option is incorrect
                        : attempts <= 0 && i === questions?.answerIndex
                        ? "#dbfff0"
                        : "#FFFFFF", // Default background color },
                  },
                ]}
                key={i}
              >
                <Text style={styles.optionsTxt}>{qn}</Text>
              </Pressable>
            ))}
            <TouchableOpacity
              onPress={() => handleNext()}
              style={styles.nextBtn}
              disabled={selectedOptionIndex === null || attempts >= 2}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: "outfit-semibold",
                  fontSize: 15,
                }}
              >
                {index + 1 === quiz?.length ? "Submit" : "Next"}
              </Text>
              {index + 1 !== quiz?.length && (
                <AntDesign name="arrowright" size={24} color="#ffffff" />
              )}
            </TouchableOpacity>
            <View
              style={{
                padding: 10,
                width: 100,
                alignSelf: "center",
                backgroundColor: "#d0d0f7",
                borderRadius: 20,
              }}
            >
              <Text style={styles.showBottmTxt}>
                {index + 1} out of {quiz?.length}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignSelf: "center",
    height: "auto",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  question: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 5,
    color: Colors.BLACK,
  },
  option: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#8e8d8d",
  },
  optionsTxt: {
    fontFamily: "outfit-semibold",
    fontSize: 15,
    color: Colors.BLACK,
  },
  nextBtn: {
    margin: 10,
    height: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
  },
  showBottmTxt: {
    textAlign: "center",
    fontFamily: "outfit-semibold",
    color: Colors.PRIMARY,
    fontSize: 15,
  },
});
