import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import Header from "../../Components/Common/Header";
import Colors from "../../utils/Colors";
import { pdfTemplate } from "../../utils/GenerateCirtificate";

const Achivements = () => {
  const navigation = useNavigation();
  const { token, user } = useSelector((state) => state.user);
  const [completeCourse, setCompleteCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCompletedCourse = async () => {
    try {
      setLoading(true);
      await axios
        .get("/enroll/check-courseComplete", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoading(false);
          setCompleteCourse(res.data.completedCourses);
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
  useEffect(() => {
    getAllCompletedCourse();
  }, []);
  const formatDate = (date) => {
    const formattedJoinDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedJoinDate;
  };
  let generatePDF = async (
    courseName,
    completeDate,
    author,
    totalTime,
    category
  ) => {
    const completionDate = formatDate(completeDate);
    const file = await printToFileAsync({
      html: pdfTemplate(
        user?.name,
        courseName,
        completionDate,
        author,
        totalTime,
        category
      ),
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Achivements`}
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
      <View>
        {completeCourse?.length === 0 && (
          <Text style={styles.defaultText}>You have no achivements</Text>
        )}
      </View>
      <FlatList
        data={completeCourse}
        refreshing={loading}
        onRefresh={() => getAllCompletedCourse()}
        renderItem={({ item, index }) => (
          <View style={styles.pdfCard}>
            <Image
              source={{ uri: item?.banner?.url }}
              style={{
                width: 70,
                height: 50,
                borderRadius: 5,
                objectFit: "cover",
              }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "outfit-semibold",
                  fontSize: 13,
                  color: Colors.BLACK,
                }}
              >
                {item?.name.length > 35
                  ? item?.name.substring(0, 35) + ".."
                  : item?.name}
              </Text>
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: "#7a7a7a" }}
              >
                ({item.chapter.length}/{item.chapter.length}) 100% Complete
              </Text>
              <Text
                style={{ fontSize: 11, fontWeight: "500", color: "#1c1b1b" }}
              >
                Download your certificate
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 5 }}>
              <TouchableOpacity
                style={styles.downLoadButtn}
                onPress={() =>
                  generatePDF(
                    item?.name,
                    Date.now(),
                    item?.author,
                    item?.time,
                    item?.category
                  )
                }
              >
                <Feather name="download" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Achivements;

const styles = StyleSheet.create({
  defaultText: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "outfit-semibold",
    fontSize: 15,
    color: Colors.BLACK,
  },
  pdfCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: Colors.WHITE,
  },
  downLoadButtn: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFDFDF",
    borderRadius: 99,
  },
});
