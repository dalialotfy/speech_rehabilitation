import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native";

const Modaal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  let categs = ['أشخاص','أفعال','ملابس','طعام','أجهزة_كهربائية','غرف_النوم','مطبخ','غرفة_المعيشة','ألوان','أسامي_الغرف','أدوات_مدرسية']
//fun fetch w ab3t fel api query{categs[i]} w a7ot elfun de fe click() w a3ml equal lel result m3 detail
  let [detail,setDetail]=useState([])
  let [path,setPath]=useState('')
  let count=0
async function click()
  {
    setModalVisible(true)
    for(let c=0;c<12;c++)
    {
      if (props.categ==categs[c])
      {
         console.log(categs[c])
         let response = await fetch(`http://127.0.0.1:8000/category/?table=${categs[c]}`)
         let finalResponse = await response.json()
         console.log(finalResponse.Names)
        //  let categName=(finalResponse.Names).map(name=>name)
        // detail=categName.join("\n")
        setDetail(finalResponse.Names)
        setPath(finalResponse.Paths)
        count=finalResponse.Names.length
        // for(let i=0 ; i<(finalResponse.Names).length;i++)
        // {
        //   console.log(finalResponse.Names[i])
         
        
          
        // }

       
      }
    }
  }

  async function listen_db(id)
  {
    
    //setModalVisible(true)
    for(let c=0;c<12;c++)
    {
      if (props.categ==categs[c])
      {
      let response = await fetch(`http://127.0.0.1:8000/findname/?table=${categs[c]}&id=${id}`)
      let finalResponse = await response.json()
      // let path= finalResponse.path
      // console.log(path)
      }}
  }
  
  return (
    <View style={styles.centeredView}>
  
      <Modal
      propagateSwipe={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
        <ScrollView>
          <View style={styles.modalView}>
            {detail.map((name,index)=><Pressable key={index} onPress={()=>listen_db(index+1)}>
            <Text key={index} style={styles.modalText}>{name}</Text>
            </Pressable>)}
            <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => listen_db()}
      >
        <Text style={styles.textStyle} >اسمع ما اخترته</Text>
      </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>إغلاق</Text>
            </Pressable>
     
      
          </View>
          </ScrollView>
        </View>

      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => click()}
      >
        <Text style={styles.textStyle}><Icon name={props.icon} size={30} color="white" />  {props.categ}</Text>
        
      </Pressable>
 
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Modaal;