import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const Modaal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  let categs = ['أشخاص','أفعال','ملابس','طعام','أجهزة كهربائية','غرف النوم','مطبخ','غرف المعيشة','ألوان','أسماءالغرف','أدوات مدرسية']
//fun fetch w ab3t fel api {categs[i]} w a7ot elfun de fe click() w a3ml equal lel result m3 detail
  function click()
  {
    setModalVisible(true)
    for(let i=0;i<12;i++)
    {
      if (props.categ==categs[i])
      {
         console.log(categs[i])
  
      }
    }

  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={()=>console.log("pressed!")}>
            <Text style={styles.modalText}>{props.details}</Text></Pressable>
            <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(true)}
      >
        
        <Text style={styles.textStyle}>اسمع ما اخترته</Text>
      </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>إغلاق</Text>
            </Pressable>

      
          </View>
        </View>

      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => click()}
      >
        <Text style={styles.textStyle}>{props.categ}</Text>
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