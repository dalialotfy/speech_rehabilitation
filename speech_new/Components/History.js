import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


export default function History() {

  let encodeData= localStorage.getItem('userToken')
  let userData= jwtDecode(encodeData)

  return (
    <View style={{flex: 1, backgroundColor: '#251e51',justifyContent:'center',alignItems:'center'}}>
    <View style={styles.square}>
    <Text style={{justifyContent:'center',fontSize:30,color:'white',fontWeight:'bold',marginBottom:20}}>بيانات المريض:</Text>    
    <Text  style={styles.buttonTextStyle}>اسم المريض: {userData.user_Name}</Text>    
    <Text  style={styles.buttonTextStyle}>العمر:{userData.user_age}</Text>    
    <Text  style={styles.buttonTextStyle}> الايميل:{userData.user_email}</Text>    
    <Text  style={styles.buttonTextStyle}>تاريخ الدخول:{userData.expiration}</Text>
    <Text  style={styles.buttonTextStyle}> الاسماء التي تم التدرب على نطقها:</Text>
    <Text  style={styles.buttonTextStyle}> مستوى التقدم:</Text>


    </View>
    </View>
  )
}
const styles = StyleSheet.create({

    square:
    {

        backgroundColor:'rgba(173, 216, 230,0.5)',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        width:800,
        height:500,
        padding:20
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight:'bold',
    
      },



},)