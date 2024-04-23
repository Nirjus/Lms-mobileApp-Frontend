import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "../Components/Icon";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Profile from "./Profile";
import Courses from "./Courses";
import * as Animatable from "react-native-animatable";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    Icon: FontAwesome,
    iconName: "home",
    component: Home,
  },
  {
    route: "Course",
    label: "Course",
    Icon: FontAwesome,
    iconName: "book",
    component: Courses,
  },
  {
    route: "LeaderBoard",
    label: "LeaderBoard",
    Icon: MaterialIcons,
    iconName: "leaderboard",
    component: LeaderBoard,
  },
  {
    route: "Profile",
    label: "Profile",
    Icon: FontAwesome,
    iconName: "user",
    component: Profile,
  },
];

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const animate1 = {
    0: { scale: 0.5, translateY: 0 },
    0.8: { translateY: -35 },
    1: { scale: 1.2, translateY: -24 },
  };

  const circle1 = {
    0: {
      opacity: 0,
      scale: 0,
      backgroundColor: "#fff",
    },

    1: {
      opacity: 1,
      scale: 1,
      backgroundColor: "#3640fd",
    },
  };

  const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(animate1);
        circleRef.current.animate(circle1);
        textRef.current.transitionTo({ opacity: 1, fontSize: 10, scale: 1 });
      }
    }, [focused]);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.tabbar}
        onPress={onPress}
      >
        <Animatable.View style={styles.tabbar} ref={viewRef} duration={700}>
          <View style={styles.btn}>
            <Animatable.View
              ref={circleRef}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 100,
                // backgroundColor: "transparent", // Ensure the circle has a transparent background
              }}
            />
            <Icon
              type={item.Icon}
              name={item.iconName}
              color={focused ? "#ffffff" : "#3640fd"}
            />
          </View>

          <Animatable.Text
            style={{
              fontSize: 0,
              color: "blue",
              textAlign: "center",
              fontWeight: "400",
              fontStyle: "italic",
              opacity: 0,
              transform: [{ scale: 0 }],
            }}
            ref={textRef}
          >
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
      initialRouteName="Home"
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          name={item.route}
          component={item.component}
          key={index}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabbar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
