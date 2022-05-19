import React from 'react';
import { StyleSheet, Text, View, Button ,TouchableOpacity} from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
const img = {uri:"voice.jpg"}
export default function Speech(props) {

       
  return (
      <>
    <ImageBackground source={require('../assets/voice.jpg')} resizeMode='cover' style={styles.image}>
      <View style={styles.spaceText}>
    <Text style={styles.title}>Choose the Mode :</Text></View>
    <View style ={styles.container} >
    <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {props.navigation.navigate("Assistant")}}>
            <Text style={styles.buttonTextStyle}> Assistant Mode </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {props.navigation.navigate("Coach")}}>
            <Text style={styles.buttonTextStyle}> Coach Mode </Text>
          </TouchableOpacity>
  </View>
  </ImageBackground></>
  )
}


const styles = StyleSheet.create({

    container:
    {
      
        flex:1,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
       
    },
    button1:
    {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:150,
        marginBottom:250,
        padding:3,
        borderRadius:20,
        padding: 10,
        elevation: 2

    },
    title:
    {   display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        fontSize:30,
        fontWeight:'100',
        marginTop:60,
        color:'white',
        fontWeight:'bold'
        

    },
    image:
    {
      flex: 1,
      justifyContent: "center"
    },
    space:
    {
      width:200,
      height:50
    },
    spaceText:
    {
      height:300,

    },
    buttonStyle: {
      backgroundColor: '#622da4',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 50,
      alignItems: 'center',
      borderRadius: 30,
      // marginLeft: 35,
      // marginRight: 35,
      marginTop: 20,
      marginBottom: 10,
      margin:'auto',
      justifyContent:'center',
      width:'40%'
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 18,
      fontWeight:'bold'
    },
});