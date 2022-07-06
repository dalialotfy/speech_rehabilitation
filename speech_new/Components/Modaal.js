import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Platform, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native";
// import 'localstorage-polyfill'; 


const Modaal = (props) => {
  let Ip = '172.28.130.105'

  const [modalVisible, setModalVisible] = useState(false);
  let categs = ['أشخاص', 'أفعال', 'حروف_الجر', 'ملابس', 'طعام', 'أجهزة_كهربائية', 'غرف_النوم', 'مطبخ', 'غرفة_المعيشة', 'ألوان', 'أسامي_الغرف', 'أدوات_مدرسية']
  let [detail, setDetail] = useState([])
  let [path, setPath] = useState('')
  let count = 0
  let pathArray;
  let [Name, setName] = useState([])
// ########################## local storage for path array ###########################
  if (localStorage.getItem("pathArrays") === null) {
    pathArray = [];
  }
  else {
    pathArray = JSON.parse(localStorage.getItem("pathArrays"));
  }
  async function click() {
    setModalVisible(true)
    for (let c = 0; c < 13; c++) {
      if (props.categ == categs[c]) {
        let response = await fetch(`http://${Ip}:8000/category/?table=${categs[c]}`)
        let finalResponse = await response.json()
        console.log(finalResponse.Names)
        setDetail(finalResponse.Names)
        setPath(finalResponse.Paths)
        count = finalResponse.Names.length
      }
    }
  }
  async function listen_db(id, Name) {
    console.log(id)

    for (let c = 0; c < 12; c++) {

      if (props.categ == categs[c]) {
        let response = await fetch(`http://${Ip}:8000/findname/?table=${categs[c]}&id=${id}`)
        let finalResponse = await response.json()
        let path = finalResponse.path

      }
    }
  }
  async function writeSent(id,Name)
  {
    console.log(id)
    for (let c = 0; c < 12; c++) {

      if (props.categ == categs[c]) {
        let response = await fetch(`http://${Ip}:8000/findname/?table=${categs[c]}&id=${id}`)
        let obj = { "id": id, "table": categs[c] }
        pathArray.push(obj)
        localStorage.setItem("pathArrays", JSON.stringify(pathArray))
        // console.log(obj)
        console.log("in listendb", pathArray)

      }
    }
    // setName(Name)
    let ArraySent;
    if ((localStorage.getItem("ArraySent") === null)){
      ArraySent=[];
      }
    else {
      ArraySent = JSON.parse(localStorage.getItem("ArraySent"));
    }
    ArraySent.push(Name)
    localStorage.setItem("ArraySent", JSON.stringify(ArraySent))
 
    console.log(Name)
    props.func(ArraySent);
  }

  // async function playList() {
  //   console.log("fe fun esm3", pathArray)

  //   let data = await fetch(`http://${Ip}:8000/get_list`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       pathArray


  //     })
  //   });
  //   console.log("fe fun esm3", pathArray)
  // }

  // ##################################  Clear word  ###########################################
  function clear(name) 
  {    
    // setName(array)

    let array= JSON.parse(localStorage.getItem("ArraySent"))
    let indx=array.indexOf(name)
    console.log("array",array)
    console.log("indx",indx)
    console.log("name",name)
    if (indx!=-1)
    {
      array.splice(indx,1)

    }
    localStorage.setItem("ArraySent",JSON.stringify(array))
    if (localStorage.getItem("ArraySent") === null) {
      pathArray = [];
    }
    else {
      pathArray = JSON.parse(localStorage.getItem("ArraySent"))

    }
    // console.log(Name)
    // props.func(array);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
<ScrollView>
        <View style={styles.centereddView}>
    

          <View style={styles.modalView}>
          <Icon name='closecircle' size={30} color='white' style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}/>
            {props.details}
            {detail.map((name, index) =>
             <Pressable  style={styles.detail}  key={index}>
              <Text  key={index} style={styles.buttonTextStyle}>
                {name}
                <Icon  style={{marginRight:10}} onPress={()=>clear(name)} name="delete" size={30} color='white'/>
                <Icon style={{marginRight:10}} onPress={()=>writeSent(index+1,name)} name='pluscircle' size={30} color='white' />
                <Icon  style={{marginRight:250}} onPress={() => listen_db(index+1,name)} name="play" size={30} color='white'/>        
                </Text>
            </Pressable>)}
          </View>
        </View></ScrollView>

      </Modal>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', width: '80%' }}>
        <TouchableOpacity onPress={() => click()}>
          <View>
            <Image style={styles.img} source={props.imag} />
            <Text style={styles.TextStyle}>{props.categ} </Text>
          </View>
        </TouchableOpacity>

      </View></View>      

  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent:'center',
    width:Platform.OS==('android')? '100%':Platform.OS==('ios')? '100%':"33%",
    // marginTop: 22
  },

  modalView: {
    position:'absolute',
    left:0,
    right:0,
    top:0,
    width:Platform.OS==('android')? '100%':Platform.OS==('ios')? '100%':"70%",
    margin:'auto',
    // margin: 150,
    marginTop: 200,
    backgroundColor: "rgb(153, 130, 255)",
    borderRadius: 20,
    padding: 55,
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
    elevation: 2,
    marginBottom: 10
  },
  buttonOpen: {
    backgroundColor: "#622da4",

  },
  buttonClose: {
    position:'absolute',
    left:0,
    top:0
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
  detail:{
    flexDirection:'column',
    flexWrap:'wrap',
    alignContent:'space-around',
    width:'100%',
    backgroundColor:'#622da4',
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    flex:1,

    flexDirection:'column',
    alignContent:'space-around',
    width:'80%'


  },
  TextStyle:
  {
    color: '#FFFFFF',
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
});

export default Modaal;