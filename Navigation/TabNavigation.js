import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../App/Screen/Home';
import LeaderBoard from '../App/Screen/LeaderBoard';
import Profile from '../App/Screen/Profile';
import Courses from '../App/Screen/Courses';

const TabNavigation = () => {

    const Tab = createBottomTabNavigator();
  return (
   
     <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName=''>

        <Tab.Screen name='Home' component={Home} 
        options={{
                  tabBarIcon: ({color, size}) => (
                    <FontAwesome name="home" size={size} color={color} />
                  )
        }}
        />
         <Tab.Screen name='Courses' component={Courses}
         options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="book" size={size} color={color} />
            )
  }}
        />
        <Tab.Screen name='Leaderboard' component={LeaderBoard}
         options={{
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="leaderboard" size={size} color={color} />
            )
  }}
        />
        <Tab.Screen name='Profile' component={Profile}
         options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="user" size={size} color={color} />
            )
  }}
        />

     </Tab.Navigator>
     
  )
}

export default TabNavigation