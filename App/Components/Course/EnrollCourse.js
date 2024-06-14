import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import CalculatePrice from "./calculatePrice";

const EnrollCourse = ({
  coursePrice,
  isEnrolled,
  setPrice,
  checkEnrollingOfCourse,
  continueOnCourse,
}) => {
  return (
    <>
      {isEnrolled ? (
        <TouchableOpacity
          onPress={() => continueOnCourse()}
          activeOpacity={0.4}
          style={{
            margin: 15,
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-semibold",
              fontWeight: "600",
              fontSize: 15,
              color: Colors.WHITE,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => checkEnrollingOfCourse()}
          activeOpacity={0.4}
          style={{
            margin: 15,
            padding: 15,
            backgroundColor: Colors.SECONDARY,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CalculatePrice coursePrice={coursePrice} setPrice={setPrice} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default EnrollCourse;

const styles = StyleSheet.create({});
