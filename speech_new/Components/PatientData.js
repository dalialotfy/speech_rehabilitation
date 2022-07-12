import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image} from 'react-native'
import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';



export default function PatientData(props) {
    console.log(props)
  return (
    <>
 <View style={{backgroundColor:'rgba(173, 216, 230,0.5)',width:700,height:350,padding:20,marginBottom:50}}>
    <View style={styles.image}>  
  <Image style={styles.img} source={require(`../assets/categ/person.jpg`)}/>
</View>

    <View style={styles.square}>
    <Text style={{justifyContent:'center',fontSize:30,color:'white',fontWeight:'bolder',marginBottom:20}}> بيانات المريض الشخصية:</Text>    
    <Text  style={styles.buttonTextStyle}>اسم المريض:   {props.hisInfo['1']}</Text>    
    <Text  style={styles.buttonTextStyle}>العمر:  {props.hisInfo['3']}</Text>    
    <Text  style={styles.buttonTextStyle}> الايميل:  {props.hisInfo['2']}</Text>   
    <Text  style={styles.buttonTextStyle}> الاسم المتدرب على نطقه:  {props.hisInfo['7']}</Text>   
    <Text  style={styles.buttonTextStyle}> مستوى التقدم:  {props.hisInfo['9']} %</Text>   
 
    </View></View>
    </>
  )
}
const styles = StyleSheet.create({
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight:'bold',
    
      },
      square:
      {
  
          display:'flex',
          justifyContent:'flex-start',
          alignItems:'flex-end',
          position:'absolute',
          right:'5%',
          top:'5%'
  
      },
      image:
      {
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-start',
        width:'20%',
        
        


      },
      img:{
        width: 200,
        height: 200,
        borderRadius: 200,
      },


})