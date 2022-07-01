import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function Ass(props) {
// :::::::::::::::::::::::::::::::::::::::IP ADDRESS :::::::::::::::::::::::::::::::::::::::::::
let Ip='192.168.1.2'
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
   //::::::::::::::::::::::::::::::::::::::Categories ::::::::::::::::::::::::::::::::::::::::::
   let categs = ['أشخاص', 'أفعال', 'حروف_الجر', 'ملابس', 'طعام', 'أجهزة_كهربائية', 'غرف_النوم', 'مطبخ', 'غرفة_المعيشة', 'ألوان', 'أسامي_الغرف', 'أدوات_مدرسية']
   // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
let [visible,setVisible]=useState(false)
   // ::::::::::::::::::::::::::get categs names fun:::::::::::::::::::::::::::::::::::::::::::::::
   async function getCategs()
   {
     setModalVisible(true)
     for(let c=0;c<13;c++)
     {
       if (props.categ==categs[c])
       {
         //  console.log(categs[c])
          let response = await fetch(`http://${Ip}:8000/category/?table=${categs[c]}`)
          let finalResponse = await response.json()
          console.log(finalResponse.Names)
          setDetail(finalResponse.Names)
          setPath(finalResponse.Paths)
         // for(let i=0 ; i<(finalResponse.Names).length;i++)
         // {
         //   console.log(finalResponse.Names[i])
          
  
           
         // }
 
        
       }
     }
   }




   return (
      <>
         <ScrollView style={{ flex: 1, backgroundColor: '#251e51' }}>
            <View style={{ flex: 1, backgroundColor: '#251e51', alignItems: 'center', justifyContent: 'center' }}>
               <Text style={styles.buttonTextStyle}>كون جملتك من التصنيفات التالية</Text>
               <View style={styles.spaceText}>

                  {/* <Icon onPress={clear} name='delete' size={30} color="white" />  */}
                  {/* {ArraySent.map((name,index)=> */}
                  <Text style={styles.sentence}>.........................................</Text>
                  {/* //  ) 
              //   }  */}

               </View>
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', width: '80%' }}>
                  {/* ::::::::::::::::::::::::::1::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column' }}>
                        <Image style={styles.img} source={require('../assets/categ/person.jpg')} />
                        <Text style={styles.TextStyle}>{categs[0]} </Text>
                     </View>
                  </TouchableOpacity>
                  {/* ::::::::::::::::::::::::::2::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/action.png')} />
                        <Text style={styles.TextStyle}>{categs[1]} </Text>
                     </View>
                  </TouchableOpacity>
                  {/* ::::::::::::::::::::::::::3::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/word.png')} />
                        <Text style={styles.TextStyle}>{categs[2]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::4::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/cloth.png')} />
                        <Text style={styles.TextStyle}>{categs[3]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::5::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/food.jpg')} />
                        <Text style={styles.TextStyle}>{categs[4]} </Text>
                     </View>
                  </TouchableOpacity>
                  {/* ::::::::::::::::::::::::::6::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column' }}>
                        <Image style={styles.img} source={require('../assets/categ/device.png')} />
                        <Text style={styles.TextStyle}>{categs[5]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::7::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/room.jpg')} />
                        <Text style={styles.TextStyle}>{categs[6]} </Text>
                     </View>
                  </TouchableOpacity>
                  {/* ::::::::::::::::::::::::::8::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/kitchen.png')} />
                        <Text style={styles.TextStyle}>{categs[7]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::9::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/live.png')} />
                        <Text style={styles.TextStyle}>{categs[8]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::10::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/color.png')} />
                        <Text style={styles.TextStyle}>{categs[9]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::11::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/rooms.jpg')} />
                        <Text style={styles.TextStyle}>{categs[10]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::12::::::::::::::::::::::::::::::: */}
                  <TouchableOpacity onPress={getCategs}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Image style={styles.img} source={require('../assets/categ/school.png')} />
                        <Text style={styles.TextStyle}>{categs[11]} </Text>
                     </View>
                  </TouchableOpacity >
                  {/* ::::::::::::::::::::::::::End::::::::::::::::::::::::::::::: */}
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#251e51'

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
      margin: 'auto',
      justifyContent: 'center',
      width: '40%'
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
      width: 350,
      height: 40,
      marginEnd: 5,
      textAlign: 'center',
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 18,
      fontWeight: 'bold',

   },
   spaceText:
   {
      // width:90,
      // height:70,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row-reverse',
      margin: 20,
      padding: 10,
      backgroundColor: '#622da4',


   },

});