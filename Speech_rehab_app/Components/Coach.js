import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
export default function Coach() {

/////////////////////////////// Random Name /////////////////////////////////////////
let [randomNames,setRandomNames] = useState("الكلمة")
let [progress,setProgress]=useState(0)
async function random()
{
// let Names = ["طارق","أميرة","ميار","رضوى","داليا"];
// randomNames = Names[Math.floor(Math.random()*Names.length)];
// console.log(randomNames)
// setRandomNames(randomNames)
let response = await fetch("http://127.0.0.1:8000/random_audio")
let finalResponse = await response.json()
setRandomNames(finalResponse.Aud_Name)
console.log(finalResponse.Aud_Name)
}
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Listen to db /////////////////////////////////////////
async function listen_db()
{
    let response = await fetch("http://127.0.0.1:8000/play_random")
    let finalResponse = await response.json()
   
}
// //////////////////////////record ur voice ///////////////////////////////////////////
let[record , setRecord ]= useState("سجل صوتك")
async function record_ur_voice()
{
    setRecord("التسجيل يبدأ ...")  
    let response = await fetch("http://127.0.0.1:8000/record")
    let finalResponse = await response.json()
   
}
// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////listen to ur voice ///////////////////////////////////////////
async function listen_ur_voice()
{
    setRecord("سجل صوتك")
    let response = await fetch("http://127.0.0.1:8000/play")
    let finalResponse = await response.json() 
}
// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////Similarity ///////////////////////////////////////////
async function similarity()
{
    setRecord("سجل صوتك")
    let response = await fetch("http://127.0.0.1:8000/similarity")
    let finalResponse = await response.json() 
    setProgress(finalResponse.Score)
}
  return (
      <>
    <ImageBackground source={require('../assets/coach.jpg')} resizeMode='cover' style={styles.image}>
      <View style={styles.container}>
          <View style={styles.square}> 
      <View style={styles.spaceText}><Text style={styles.title}>{randomNames}</Text></View>
<View style={styles.space}>
    <Button style={styles.button1} color='purple'  title= 'أظهر اسما عشوائيا'onPress={() =>{random()}}/>
</View>
<View style={styles.space}>
    <Button style={styles.button1} color='purple'  title= 'شغل النطق السليم'onPress={() =>{listen_db()}}/>
</View>
<View style={styles.space}
><Button style={styles.button1} color='purple' title={record} onPress={() =>{record_ur_voice()}}/>
</View>
<View style={styles.space}>    
<Button style={styles.button1} color='purple' title= 'شغل صوتك'onPress={() =>{listen_ur_voice()}}/>
</View>
<View style={styles.space}>   
 <Button style={styles.button1} color='purple' title= 'مستوى التقدم'onPress={() =>{similarity()}}/></View>
<View style={styles.space}>
     <Text style={styles.title}>{progress}</Text>
      </View>
</View>
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
        width:100,
        height:100
    },
    spaceText:
    {
        width:90,
        height:70,
        textAlign:'center',

    },
    square:
    {
        width:1100,
        height:700,
        backgroundColor:'rgba(238, 130, 238,0.7)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    }

});