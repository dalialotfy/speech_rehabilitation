import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image,TextInput} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import PatientData from './PatientData';


export default function SearchHis() {
 let Ip='192.168.1.7'
  let encodeData= localStorage.getItem('userToken')
  let userData= jwtDecode(encodeData)
  let [history,setHistory]=useState([])

  async function Doc_His()
  {
      let response = await fetch(`http://${Ip}:8000/history?token=${encodeData}`)
      let finalResponse = await response.json() 
      setHistory(finalResponse.Data)
  }
  useEffect(()=>{Doc_His()},[])

  return (
    <View style={{flex: 1, backgroundColor: '#251e51',justifyContent:'center',alignItems:'center',
  }}>
                <TextInput
              style={styles.inputStyle}
            //   onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="... ابحث"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
   
   {history.map((his,indx)=>
    <PatientData key={indx} hisInfo={his} />)}
 
    </View>
  )
}
const styles = StyleSheet.create({

    square:
    {

        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        position:'absolute',
        right:'5%',
        top:'5%'

    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight:'bold',
    
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
      inputStyle: {
        // flex: 1,
        color: 'white',
        width:'50%',
        paddingVertical:10,
        paddingHorizontal:5,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#dadae8',
        marginBottom:20,
        marginTop:20
    
   

      },



},)