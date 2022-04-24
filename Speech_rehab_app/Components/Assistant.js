import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Dropdown from './Dropdown';
export default function Coach() {


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Listen to db /////////////////////////////////////////
async function listen_db()
{
    let response = await fetch("")
    let finalResponse = await response.json()
   
}
// //////////////////////////record ur voice ///////////////////////////////////////////
async function record_ur_voice()
{
    let response = await fetch("http://192.168.1.17:8090/record")
    let finalResponse = await response.json()
   
}
// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////listen to ur voice ///////////////////////////////////////////
async function listen_ur_voice()
{
    let response = await fetch("http://192.168.1.17:8090/play")
    let finalResponse = await response.json()
   
}




  return (
      <>
    <ImageBackground source={require('../assets/coach.jpg')} resizeMode='cover' style={styles.image}>
      <View style={styles.container}>
          <View style={styles.square}>
      <View style={styles.spaceText}><Text style={styles.title}>كوّن جُملتك ...</Text></View>
      <View style={styles.spaceText}><Text style={styles.sentence}></Text></View>
      
      <View style={styles.space}>
          <View style={styles.div}>
          <View style={styles.space}> <Button title='أشخاص' color='rgba(238, 130, 238,0.7)'/>
          <Dropdown/>
          <Button title='أفعال' color='rgba(238, 130, 238,0.7)'/>
          <Dropdown/>
          <Button title='طعام' color='rgba(238, 130, 238,0.7)'/>
          <Dropdown/>
         <Button title='ملابس' color='rgba(238, 130, 238,0.7)'/>
         <Dropdown/>
         <Button title='مطبخ' color='rgba(238, 130, 238,0.7)'/>
         <Dropdown/>
         <Button title='ألوان' color='rgba(238, 130, 238,0.7)'/>
         <Dropdown/>
      


          </View>
          </View>
          
          </View>

</View></View>
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
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'center',
        // marginTop:150,
        // marginBottom:250,
        // padding:3,
  
      
  

    },
    title:
    
    {   display:"flex",
        justifyContent:"center",
        fontSize:30,
        fontWeight:'100',
        fontWeight:'bold',
        color:'white'
        

    },
    image:
    {
      flex: 1,
      justifyContent: "center"
    },
    space:
    {
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        width:200,
        height:40,
        // margin:'auto'        
    },
    spaceText:
    {
        // width:90,
        // height:70,
        textAlign:'center',

    },
    square:
    {
        width:1100,
        height:700,
      
        backgroundColor:'rgba(238, 130, 238,0.7)',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'

    },
    sentence:
    {
      width:800,
      height:70,
      backgroundColor:'purple',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center'
    },
    div :
    {
        width:700,
        height:450,
        margin:'auto',
        backgroundColor:'purple',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
       
    }

});