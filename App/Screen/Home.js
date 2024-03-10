import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import Colors from '../utils/Colors';

export default function Home() {

    const {user} = useSelector((state) => state.user);


  return (
    <View>
    <View style={styles.headerContainer}>
    <Header user={user} />
    </View>
       </View>
  )
}

const styles = StyleSheet.create({
   headerContainer:{
        backgroundColor: Colors.PRIMARY,
        paddingTop:20,
        height: 270
   }
})