import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
<View style={styles.space}>
    <Button 
      title= 'Assistant Mode'
      onPress={() =>
       {props.navigation.navigate("Assistant")}}
    /></View>
   <View style={styles.space}>
        <Button style={styles.button1}
      title= 'Coach Mode'
      onPress={() =>{props.navigation.navigate("Coach")}}
    /></View> 
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

    }
});