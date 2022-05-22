import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,Pressable} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Dropdown from './Dropdown';
import Modaal from './Modaal';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import 'localstorage-polyfill'; 
export default function Assistant(props) {
// console.log(props)

let[Names,setName]=useState([])
let names =["علاء","اسماعيل","حسن","محمد","احمد","توفيق"]
let food = ["لحمة","فراخ","ارز","سمك","فلفل","طماطم"]
let [detail,setDetail]=useState([])


let categName=names.map(name=>name)
detail=categName.join("\n")
let ArraySent;
if(localStorage.getItem("ArraySent")=== null){
    ArraySent=[];
    // console.log("fadyyy")
}
else{
  // console.log("msh fadyyy")

  ArraySent = JSON.parse(localStorage.getItem("ArraySent")) ;
 
}
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Listen to db /////////////////////////////////////////
async function listen_db()
{
    let response = await fetch("")
    let finalResponse = await response.json()
   
}
const pull_data = (data) => {
    // console.log(data)
    // let arr=[]
    // arr.push(data)
    
    // console.log(arr)
//  for(let i=0;i<Names.length;i++)
//  {
    //  arr.map((a,ind)=>{setName(a)})
    // setName(data)
    console.log(data)
    ArraySent.push(data)
    console.log(ArraySent)
    localStorage.setItem("ArraySent",JSON.stringify(ArraySent) )
    console.log(ArraySent)
    setName(ArraySent)
//  }
   
// console.log(Names); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    // Names.map((name,index)=>{console.log(name)})

  }

  function clear()
  {
    // setModalVisible(!modalVisible);
    // pathArray=null
    localStorage.clear()
    if(localStorage.getItem("ArraySent")=== null){
      ArraySent=[];
      // console.log("fadyyy")
  }
  else{
    // console.log("msh fadyyy")
  
    ArraySent = JSON.parse(localStorage.getItem("ArraySent"))
   
  }
    // console.log(pathArray)
    // console.log("clear")

  }

let categs = ['أشخاص','أفعال','حروف_الجر','ملابس','طعام','أجهزة_كهربائية','غرف_النوم','مطبخ','غرفة_المعيشة','ألوان','أسامي_الغرف','أدوات_مدرسية']
return (
      <>
      <ScrollView>
    <ImageBackground source={require('../assets/coach.jpg')} resizeMode='cover' style={styles.image}>
      <View style={styles.container}>
          <View style={styles.square}>
      <View style={styles.spaceText}><Text style={styles.title}>كوّن جُملتك ...</Text></View>
     
     <View style={styles.spaceText}>
      
<Icon onPress={clear} name='delete' size={30} color="white" /> 
     {ArraySent.map((name,index)=>
         <Text key={index}  style={styles.sentence}>{name}</Text>
         ) 
          } 
       
      </View>

      <Modaal  categ={categs[0]} icon="address-book-o" func={pull_data}/>
      <Modaal  categ={categs[1]} icon="play-circle"    func={pull_data}/> 
      <Modaal  categ={categs[2]} icon="shopping-bag"    func={pull_data}/> 
      <Modaal  categ={categs[3]} icon="coffee"     func={pull_data}/> 
      <Modaal  categ={categs[4]} icon="laptop"  func={pull_data}/> 
      <Modaal  categ={categs[5]} icon ="bed"  func={pull_data}/>
      <Modaal categ={categs[6]}   icon ="coffee"   func={pull_data}/>
      <Modaal  categ={categs[7]} icon="home"  func={pull_data}/>
      <Modaal categ={categs[8]} icon='filter' func={pull_data}/>
      <Modaal categ={categs[9]}icon='codepen'  func={pull_data}/>
      <Modaal categ={categs[10]} icon='briefcase' func={pull_data}/>

      <View style={styles.space}>
          {/* <View style={styles.div}>
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
      


          </View> */}
          {/* </View> */}
          
          </View>

</View></View>
</ImageBackground></ScrollView>
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
        display:'flex',
        flexDirection:'row-reverse',
        margin:20,
        padding:10,
        backgroundColor:'#622da4',


    },
    square:
    {
        width:1100,
        height:700,
      
        backgroundColor:'rgba(173, 216, 230,0.5)',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'

    },
    sentence:
    {
    //   width:8,
    marginEnd:5,
    //   height:70,
    //   display:'flex',
    //   justifyContent:'center',
    //   alignItems:'center',
      textAlign:'center',
    //   padding:30,
    //   paddingHorizontal:500
    color: '#FFFFFF',
    // paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    // padding:25
    },
    div :
    {
        width:700,
        height:450,
        margin:'auto',
        backgroundColor:'rgb(0, 0, 128)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
       
    }

});