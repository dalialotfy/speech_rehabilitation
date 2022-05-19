import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import sound from 'react-native-sound';
const img = {uri:"voice.jpg"}
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

export default function Home(props) {

  return (
      <>
    <ImageBackground  source={require('../assets/voice.jpg')} resizeMode='cover' style={styles.image}>

    <View style ={styles.container} >
      <View style={styles.spaceText}><Text style={styles.title}>Speech Rehabilitation App</Text>
</View>
{/* <Icon name="rocket" size={30} color="#900" /> */}
    <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {props.navigation.navigate("Login")}}>
            <Text style={styles.buttonTextStyle}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {props.navigation.navigate("Register")}}>
            <Text style={styles.buttonTextStyle}> Register </Text>
          </TouchableOpacity>
    </View>
    </ImageBackground>
  </>
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

    },
    title:
    {   display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        fontSize:40,
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
      height:40
    },
    spaceText:
    {
      height:450,

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