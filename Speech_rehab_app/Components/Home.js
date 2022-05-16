import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import sound from 'react-native-sound';
const img = {uri:"voice.jpg"}
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

export default function Home(props) {

 function play()
 {
  //  var Sound=require('react-native-sound')
  //  Sound.setCategory('Playback');

  // var audio = new Sound(
  //   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  //   null,
  //   error => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //       return;
  //     }
  //     // if loaded successfully
  //     console.log(
  //       'duration in seconds: ' +
  //         audio.getDuration() +
  //         'number of channels: ' +
  //         audio.getNumberOfChannels(),
  //     );
  //   },
  // );
  // const url = "http://lacavewebradio.chickenkiller.com:8000/stream.mp3";
ReactNativeAudioStreaming.pause();
// ReactNativeAudioStreaming.resume();
// ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
// ReactNativeAudioStreaming.stop();
 }
  return (
      <>
    <ImageBackground  source={require('../assets/voice.jpg')} resizeMode='cover' style={styles.image}>

    <View style ={styles.container} >
      <View style={styles.spaceText}><Text style={styles.title}>Speech Rehabilitation App</Text>
</View>
{/* <Icon name="rocket" size={30} color="#900" /> */}
<View style={styles.space}>
    <Button 
      title= 'Login'
      onPress={() =>
       {props.navigation.navigate("Login")}}
    />
    </View>
 <View style={styles.space}> 
        <Button style={styles.button1}
      title= 'Register'
      onPress={() =>{props.navigation.navigate("Register")}}
    /></View>  
     <View style={styles.space}> 
        <Button style={styles.button1}
      title= 'PLAY'
      onPress={() =>{play()}}
    /></View> 
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
      height:500,

    }
});