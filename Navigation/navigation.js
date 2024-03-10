import GetStarted from "../App/Screen/GetStarted";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../App/Screen/Login";
import Registration from "../App/Screen/Registration";
import Home from "../App/Screen/Home";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TabNavigation from "./TabNavigation";

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getuser = async () => {
      await axios
        .get("/user/me")
        .then((res) => {
          dispatch({
            type: "LOAD_USER",
            user: res.data.user,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };
    getuser();
  }, []);

  const { user } = useSelector((state) => state.user);

  return (
    <NavigationContainer>
     
          <Stack.Navigator initialRouteName="GetStarted" screenOptions={{headerShown:false}}>
            {
              user ? (
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
            
              ) : (
                <>
               <Stack.Screen
              name="GetStarted"
              component={GetStarted}
            />
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
            />
                </>
              )
            }
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
