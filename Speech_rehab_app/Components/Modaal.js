import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View ,TouchableOpacity,Platform} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native";
import 'localstorage-polyfill'; 


const Modaal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  let categs = ['أشخاص','أفعال','ملابس','طعام','أجهزة_كهربائية','غرف_النوم','مطبخ','غرفة_المعيشة','ألوان','أسامي_الغرف','أدوات_مدرسية']
//fun fetch w ab3t fel api query{categs[i]} w a7ot elfun de fe click() w a3ml equal lel result m3 detail
  let [detail,setDetail]=useState([])
  let [path,setPath]=useState('')
  let count=0
  let pathArray;
  if(localStorage.getItem("pathArrays")=== null){
    pathArray=[];
    console.log("fadyyy")
}
else{
  console.log("msh fadyyy")

  pathArray = JSON.parse(localStorage.getItem("pathArrays")) ;
 
}
  let Ip='192.168.1.2'
async function click()
  {
    setModalVisible(true)
    for(let c=0;c<12;c++)
    {
      if (props.categ==categs[c])
      {
         console.log(categs[c])
         let response = await fetch(`http://${Ip}:8000/category/?table=${categs[c]}`)
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
      let response = await fetch(`http://${Ip}:8000/findname/?table=${categs[c]}&id=${id}`)
      let finalResponse = await response.json()
      let path= finalResponse.path
      console.log("Before push again",pathArray)
      // pathArray.push(path)
      // localStorage.setItem("pathArrays",JSON.stringify(pathArray) )
      // console.log(path)
      // console.log(pathArray)
      let obj = {"id": id , "table":categs[c] }
      pathArray.push(obj)
      localStorage.setItem("pathArrays",JSON.stringify(pathArray) )
      console.log(obj)
      console.log(pathArray)
      }}
  }

  async function playList()
  {
    let data =await fetch(`http://${Ip}:8000/get_list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathArray


      })
    });  
  }
  function clear()
  {
    // setModalVisible(!modalVisible);
    // pathArray=null
    localStorage.clear()
    if(localStorage.getItem("pathArrays")=== null){
      pathArray=[];
      console.log("fadyyy")
  }
  else{
    console.log("msh fadyyy")
  
    pathArray = JSON.parse(localStorage.getItem("pathArrays")) ;
   
  }
    console.log(pathArray)
    console.log("clear")

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
        onPress={() => playList()}
      >
        <Text style={styles.textStyle} >اسمع ما اخترته</Text>
      </Pressable>
      <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => clear()}
            >
              <Text style={styles.textStyle}>الانتقال الى جملة جديدة</Text>
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
      <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>
              {click()}}>
            <Text style={styles.buttonTextStyle}>{props.categ} </Text>
          </TouchableOpacity>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => click()}
      >
        <Text style={styles.textStyle}><Icon name={props.icon} size={30} color="white" />  {props.categ}</Text>
        
      </Pressable> */}
 
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
  },
  buttonStyle: {
    backgroundColor: '#622da4',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    // marginLeft: 35,
    // marginRight: 35,
    marginTop: 50,
    marginBottom: 50,
    // margin:'auto',
    justifyContent:'center',
    width:'400%',
  
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    // padding:10
  },
});

export default Modaal;