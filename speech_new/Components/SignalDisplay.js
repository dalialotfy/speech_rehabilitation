import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image, SectionList} from 'react-native'
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function SignalDisplay() {

// let [sec,setSec]=useState(false)
//         setTimeout(() => {
//             setSec(true)
//         }, 5000);
      

  


  return (
    <View style={{flex:1,backgroundColor:'#251e51'}}>
    <View style={styles.square}>
    {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {display()}}> */}
            {/* <Text style={styles.buttonTextStyle}> الصوت بيانيا </Text> */}
          {/* </TouchableOpacity> */}
    {/* <Image style={styles.img} source={Rec_plot}/> */}
{/* {  <Image style={styles.img} source={require(`D:/speech_rehabilitation_app/project (1)/plot/record.png`)}/>}
{  <Image style={styles.img} source={require(`D:/speech_rehabilitation_app/project (1)/plot/reference.png`)}/> */}
{/* }    */}
 </View>
    </View>
  )
  {loading?<Icon name='loading1' size={30} color="white" /> :' تسجيل'} 
}
const styles = StyleSheet.create({
    img:
    {

      width: "80%",
      height: "50%",
      justifyContent: 'center',
      alignItems:'center',
      
  
  
    },
    square:
    {
        flex:2,
        justifyContent: 'center',
        alignItems:'center'

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
        width:'30%'
      },

      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight:'bold'
      },



},)
