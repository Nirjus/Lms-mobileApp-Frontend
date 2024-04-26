import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const { token } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllUser = async () => {
      setLoading(true);
      try {
        await axios
          .get("/user/getUsers/bypoint", {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setLoading(false);
            setUserList(res.data.users);
          });
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>LeaderBoard</Text>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
