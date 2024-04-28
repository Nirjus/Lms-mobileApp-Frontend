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

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  React.useEffect(() => {
    const getuser = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let token = await AsyncStorage.getItem("@token");

      let loginData = JSON.parse(data);

      dispatch({
        type: "LOAD_USER",
        user: loginData,
        token: token,
      });
    };
    getuser();
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="BottomTabs" component={TabNavigation} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} />
            <Stack.Screen name="ChapterContent" component={ChapterContent} />
            <Stack.Screen name="MyCourses" component={MyCourses} />
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
