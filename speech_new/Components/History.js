import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image} from 'react-native'
import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import Tables from './Tables';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import 'localstorage-polyfill'; 



export default function History() {
  let Ip=`192.168.1.7`
  let encodeData= localStorage.getItem('userToken')
  let userData= jwtDecode(encodeData)
  let [history,setHistory]=useState([]);
  async function Pat_His()
  {
      let response = await fetch(`http://${Ip}:8000/history?token=${encodeData}`)
      let hist = await response.json() 
      console.log(hist.Data)
      setHistory(hist.Data)

  }
useEffect(()=>{Pat_His()},[])

  return (
    <View style={{flex: 1, backgroundColor: '#251e51',justifyContent:'center',alignItems:'center',
  }}>

    <View style={{backgroundColor:'rgba(173, 216, 230,0.5)',width:800,height:500,padding:20}}>
    <View style={styles.image}>  
  <Image style={styles.img} source={require(`../assets/categ/person.jpg`)}/>
</View>

    <View style={styles.square}>
    <Text style={{justifyContent:'center',fontSize:30,color:'white',fontWeight:'bolder',marginBottom:20}}> بيانات المريض الشخصية:</Text>    
    <Text  style={styles.buttonTextStyle}>اسم المريض: {userData.user_Name}</Text>    
    <Text  style={styles.buttonTextStyle}>العمر:{userData.user_age}</Text>    
    <Text  style={styles.buttonTextStyle}> الايميل:{userData.user_email}</Text>    
    </View>

<Table borderStyle={{borderWidth: 4, borderColor: '#251e51'}}>
    <Row borderStyle={{borderWidth: 4, borderColor: '#251e51'}} data={[ 'تاريخ الدخول', 'الاسم المتدرب على نطقه', 'مستوى التقدم']} style={styles.head} textStyle={styles.text}/>
      {history.map((his,index)=>
        <Tables key={index} hisInfo={his}/>)}
        </Table>
</View>
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

      head: { height: 40 },
      text: { margin: 6 ,color:'white',fontSize:20,fontWeight:'bold',textAlign:'center'}

},)