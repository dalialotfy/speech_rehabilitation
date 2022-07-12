import React from 'react'
import { Text, Button, StyleSheet, ImageBackground, Pressable, Platform } from 'react-native'
import { View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Dropdown from './Dropdown';
import Modaal from './Modaal';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
// import 'localstorage-polyfill'; 

export default function Assistant(props) {
  let Ip = '192.168.1.7'
  let [Names, setName] = useState(["ستظهر جملتك هنا ..."])
  let names = ["علاء", "اسماعيل", "حسن", "محمد", "احمد", "توفيق"]
  let food = ["لحمة", "فراخ", "ارز", "سمك", "فلفل", "طماطم"]
  let [detail, setDetail] = useState([])


  let categName = names.map(name => name)
  detail = categName.join("\n")
  let pathArray;

if ((localStorage.getItem("pathArrays") === null)){
  pathArray=[];
  }
else {
  pathArray = JSON.parse(localStorage.getItem("pathArrays"));
}
  
const pull_data = (data) => 
{

    setName(data)
}

  async function playList() {
    console.log("fe fun esm3", pathArray)

    let data = await fetch(`http://${Ip}:8000/get_list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathArray


      })
    });
    console.log("fe fun esm3", pathArray)
  }



  function clear() 
  {
    localStorage.clear()
    pathArray=[]
    setName(["ستظهر جملتك هنا ..."])
  }

  let categs = ['أشخاص', 'أفعال', 'حروف_الجر', 'ملابس', 'طعام', 'أجهزة_كهربائية', 'غرف_النوم', 'مطبخ', 'غرفة_المعيشة', 'ألوان', 'أسامي_الغرف', 'أدوات_مدرسية']
  let imgs = [require(`../assets/categ/person.jpg`), require(`../assets/categ/action2.png`), require(`../assets/categ/word.png`), require(`../assets/categ/cloth.png`), require(`../assets/categ/food.jpg`), require(`../assets/categ/device.png`), require(`../assets/categ/room.jpg`),require(`../assets/categ/kitchen.png`), require(`../assets/categ/live.png`), require(`../assets/categ/color.png`), require(`../assets/categ/rooms.png`), require(`../assets/categ/school.png`)]
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#251e51' }}>
        <View style={{ flex: 1, backgroundColor: '#251e51', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.buttonTextStyle}>كون جملتك من التصنيفات التالية</Text>
          <View style={styles.spaceText}>
              {Names.map((name, index) =><Text key={index} style={styles.sentence}>{name}</Text>)}
          </View>
           
<View style={{  justifyContent: 'center', alignItems: 'center',flexDirection:Platform.OS === ('android')?'column':Platform.OS === ('ios')?'column':'row', flexWrap: 'wrap', alignContent: 'space-around', width: '40%' }}>

          <TouchableOpacity onPress={playList}
            style={styles.buttonStyle}>
          <Text style={styles.buttonclearStyle}>  <Icon  style={{marginRight:10}}    name='assistive-listening-systems' size={30} color='white'/> اسمع الجملة </Text></TouchableOpacity>
          <TouchableOpacity onPress={clear}
            style={styles.buttonStyle}>
          <Text style={styles.buttonclearStyle}>  <Icons  style={{marginRight:10}}  name="delete" size={30} color='white'/> امسح الجملة </Text></TouchableOpacity>
</View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection:Platform.OS === ('android')?'column':Platform.OS === ('ios')?'column':'row', flexWrap: 'wrap', alignContent: 'space-around', width: '80%' }}>
            <Modaal categ={categs[0]} imag={imgs[0]} func={pull_data} />
            <Modaal categ={categs[1]} imag={imgs[1]} func={pull_data} />
            <Modaal categ={categs[2]} imag={imgs[2]} func={pull_data} />
            <Modaal categ={categs[3]} imag={imgs[3]} func={pull_data} />
            <Modaal categ={categs[4]} imag={imgs[4]} func={pull_data} />
            <Modaal categ={categs[5]} imag={imgs[5]} func={pull_data} />
            <Modaal categ={categs[6]} imag={imgs[6]} func={pull_data} />
            <Modaal categ={categs[7]} imag={imgs[7]} func={pull_data} />
            <Modaal categ={categs[8]} imag={imgs[8]} func={pull_data} />
            <Modaal categ={categs[9]} imag={imgs[9]} func={pull_data} />
            <Modaal categ={categs[10]} imag={imgs[10]} func={pull_data} />
            <Modaal categ={categs[11]} imag={imgs[11]} func={pull_data} />
          </View>
          </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({

  container:
  {

    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,


  },
  buttonStyle: {
    backgroundColor: '#622da4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    // height: 20,
    alignItems: 'center',
    borderRadius: 30,
    padding:8,
    // marginLeft: 35,
    // marginRight: 35,
    marginTop: 14,
    marginBottom: 14,
    margin: 'auto',
    justifyContent: 'center',
    // width: '50%'
 },
 buttonTextStyle: {
    color: '#FFFFFF',
    //   paddingVertical: 10,
    fontSize: 38,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10


 },
 buttonclearStyle: {
  color: '#FFFFFF',
  //   paddingVertical: 10,
  fontSize: 18,
  fontWeight: 'bold',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: 20,
  marginTop: 10


},
 TextStyle:
 {
    color: '#FFFFFF',
    //   paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 30
 },
 img:
 {
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',


 },
 sentence:
 {
   
    color: '#FFFFFF',
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',

 },
 spaceText:
 {
  textAlign:'center',
  display:'flex',
  flexDirection:'row-reverse',
  margin:50,
  padding:10,
  backgroundColor:'rgb(0 ,90, 194)',


 


 },
  title:

  {
    display: "flex",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: '100',
    fontWeight: 'bold',
    color: 'white'


  },

  space:
  {

    width: 200,
    height: 40,
     
  },



});