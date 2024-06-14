import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../App/Screen/Login";
import GetStarted from "../App/Screen/GetStarted";
import Registration from "../App/Screen/Registration";
import TabNavigation from "../App/Screen/TabNavigation";
import CourseDetails from "../App/Screen/Courses/CourseDetails";
import ChapterContent from "../App/Screen/Courses/ChapterContent";
import MyCourses from "../App/Screen/User/myCourses";
import CategoryPage from "../App/Screen/CategoryPage";
import EditeProfile from "../App/Screen/User/EditeProfile";
import Membership from "../App/Screen/User/Membership";
import CourseCompletionSuccess from "../App/Screen/Courses/CourseCompletionSuccess";
import Achivements from "../App/Screen/User/Achivements";
import Search from "../App/Screen/Search";
import axios from "axios";
import QuizScreen from "../App/Screen/Courses/QuizScreen";
import Review from "../App/Screen/Courses/Review";
import MemberShipModel from "../App/Screen/MemberShipModel";
import CourseProgress from "../App/Screen/Courses/CourseProgress";
import ForgotPassword from "../App/Screen/forgetPassword";

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const setUserInfo = async (data, token) => {
    await AsyncStorage.setItem("@auth", JSON.stringify(data));
    await AsyncStorage.setItem("@token", token);
    dispatch({
      type: "LOAD_USER",
      user: data,
      token: token,
    });
  };
  React.useEffect(() => {
    const getuser = async () => {
      let token = await AsyncStorage.getItem("@token");
      await axios
        .get("/user/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUserInfo(res.data.user, token);
        });
    };
    getuser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="BottomTabs" component={TabNavigation} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
            <Stack.Screen name="ChapterContent" component={ChapterContent} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
            <Stack.Screen
              name="Review"
              component={Review}
              options={{
                presentation: "modal",
                gestureDirection: "horizontal",
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="MemberShipModel"
              component={MemberShipModel}
              options={{
                presentation: "modal",
                gestureDirection: "vertical",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen name="MyCourses" component={MyCourses} />
            <Stack.Screen name="CourseProgress" component={CourseProgress} />
            <Stack.Screen name="CategoryPage" component={CategoryPage} />
            <Stack.Screen name="EditeProfile" component={EditeProfile} />
            <Stack.Screen name="Membership" component={Membership} />
            <Stack.Screen
              name="CourseCompletionSuccess"
              component={CourseCompletionSuccess}
            />
            <Stack.Screen name="Achivements" component={Achivements} />
            <Stack.Screen name="Search" component={Search} />
          </>
        ) : (
          <>
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
