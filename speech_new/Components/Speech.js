import React from 'react';
import { StyleSheet, Text, View, Button ,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
const img = {uri:"voice.jpg"}
export default function Speech(props) {
  const [style,setStyle]=useState("none")
  const [title,setTitle]=useState("")
  const [brief,setBrief]=useState("")

  function Assistant()
  {
    setStyle("flex")
    setTitle("المساعد")
    console.log(title)
      setBrief(" يهدف هذا الجزء من التطبيق الى مساعدة الأشخاص الذين لديهم ضعف في تذكر الأشياء والأشخاص عن طريق عرض مختلف الأنشطة التي يمكن أن يحتاج إلى توصيلها للمجتمع حوله لتلبية احتياجاته للآخرين")
  }
  function Coach()
  {
    setStyle("flex")
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

{/* <View style={styles.image}> */}
    <ImageBackground source={require('../assets/voice1.png')} resizeMode='cover' style={styles.image}>
      <View style={styles.spaceText}>
    <Text style={styles.title}>اختر الطريقة المناسبة للتعلم :</Text></View>
    <View style ={styles.container} >
      <View style={styles.row}>
    <TouchableOpacity
            style={styles.mainbuttonStyle}
            activeOpacity={0.5}
            onPress={Assistant}>
            <Icon style={styles.icon}  name='list-alt' size={30} color="white" /> 
            <Text style={styles.TextStyle}> المساعد </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainbuttonStyle}
            activeOpacity={0.5}
            onPress={Coach}>
            <Icon  style={styles.icon}name='record-voice-over' size={30} color="white" /> 
            <Text style={styles.TextStyle}> المدرب </Text>

          </TouchableOpacity></View>
          <View style={{backgroundColor:'rgba(173, 216, 230,0.5)', display: style}}>
            <Text style={styles.buttonTextStyle}>{brief}
            </Text>
            <View style={styles.rows}>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>{NavigateHandler()}}>
            <Text style={styles.buttonTextStyle}> استمرار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {setStyle("none")}}
            >
            <Text style={styles.buttonTextStyle}> إغلاق</Text>
          </TouchableOpacity></View>

          </View>
  </View>
  </ImageBackground>
  {/* </View> */}
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
        position:'relative',
        // backgroundColor:'#251e51'
       
    },
    row:{
      display:'flex',
      flexDirection:Platform.OS === ('android')?'column':Platform.OS === ('ios')?'column':'row'
    },
    rows:{
      display:'flex',
      flexDirection:Platform.OS === ('android')?'row':Platform.OS === ('ios')?'row':'column'
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
      justifyContent: "center",
      // backgroundColor:'#251e51'
    },
    // space:
    // {
    //   width:200,
    //   height:50
    // },
    // spaceText:
    // {
    //   height:300,

    // },
    buttonStyle: {
      backgroundColor: '#622da4',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      // height: 50,
      alignItems: 'center',
      borderRadius: 30,
      // marginLeft: 35,
      // marginRight: 35,
      marginTop:Platform.OS==('android')? 0:Platform.OS==('ios')? 0:50,
      // marginBottom: 10,
      margin:'auto',
      justifyContent:'center',
      width:'40%',
      // padding:60
    },
    mainbuttonStyle: {
      backgroundColor: '#622da4',
      borderWidth: 0,
      // color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 50,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 5,
      // marginBottom: 35,
      marginTop: 20,
      marginBottom: 3,
      margin:'auto',
      justifyContent:'center',
      paddingVertical:50,
      paddingHorizontal:120,
      shadowOpacity:20
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 18,
      fontWeight:'bold',
      textAlign:'center',
      // position:'absolute',
      // zIndex:50
      // padding:70,
     
    },
    icon:
    {
      position:'absolute',
      left:30
    },
    TextStyle:
    {
      color: '#FFFFFF',
      // paddingVertical: 10,
      // paddingHorizontal:50,
      fontSize: 26,
      fontWeight:'bold',
      textAlign:'center',
      position:'absolute',
      right:50
      // zIndex:50
      // padding:70,
    }

});