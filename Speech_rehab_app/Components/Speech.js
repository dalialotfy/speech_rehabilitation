import React from 'react';
import { StyleSheet, Text, View, Button ,TouchableOpacity} from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
const img = {uri:"voice.jpg"}
export default function Speech(props) {
  const [style,setStyle]=useState("none")
  const [title,setTitle]=useState("")
  const [brief,setBrief]=useState("")
  function Assistant()
  {
    setStyle("block")
    setTitle("المساعد")
    console.log(title)
      setBrief(" يهدف هذا الجزء من التطبيق الى مساعدة الأشخاص الذين لديهم ضعف في تذكر الأشياء والأشخاص عن طريق عرض مختلف الأنشطة التي يمكن أن يحتاج إلى توصيلها للمجتمع حوله لتلبية احتياجاته للآخرين")
  }
  function Coach()
  {
    setStyle("block")
    setTitle("المدرب")
    console.log(title)
    setBrief("يهدف هذا الجزء من التطبيق الى  تحسين النطق للأطفال والكبار عن طريق عرض أسماء عشوائية واستماعه إلى النطق السليم لها ثم محاولة تكرارها عن طريق تسجيلها بنفسه و من ثم مقارنتها مع النطق الصحيح ومتابعة التقدم ")


  }
  function NavigateHandler()
  {
    if (title=="المساعد")
    {
      props.navigation.navigate('Assistant')
      console.log("hro7 lel mosa3ed")

    }else
    {
      props.navigation.navigate('Coach')
      console.log("hro7 lel modareb")


    }
  }
       
  return (
      <>

    <ImageBackground source={require('../assets/voice.jpg')} resizeMode='cover' style={styles.image}>
      <View style={styles.spaceText}>
    <Text style={styles.title}>اختر الطريقة المناسبة للتعلم :</Text></View>
    <View style ={styles.container} >
    <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>{Assistant()}}>
            <Text style={styles.buttonTextStyle}> المساعد </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>{Coach()}}>
            <Text style={styles.buttonTextStyle}> المدرب </Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'rgba(173, 216, 230,0.5)', display: style}}>
            <Text style={styles.buttonTextStyle}>{brief}
            </Text>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {NavigateHandler()}}
            >
            <Text style={styles.buttonTextStyle}> استمرار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {setStyle("none")}}
            >
            <Text style={styles.buttonTextStyle}> إغلاق</Text>
          </TouchableOpacity>

          </View>
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
        position:'relative'
       
    },
    button1:
    {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:150,
        marginBottom:250,
        padding:3,
        borderRadius:20,
        padding: 10,
        elevation: 2

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

    },
    buttonStyle: {
      backgroundColor: '#622da4',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 50,
      alignItems: 'center',
      borderRadius: 30,
      // marginLeft: 35,
      // marginRight: 35,
      marginTop: 20,
      marginBottom: 10,
      margin:'auto',
      justifyContent:'center',
      width:'40%'
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 18,
      fontWeight:'bold',
      textAlign:'center',
      padding:10
    },
    // comment:{
    //   backgroundColor:'red',
    //   position:'absolute',
    //   top:-200,
    //   left:0
      
    // }
});