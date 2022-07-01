import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Platform, Image } from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native";
// import 'localstorage-polyfill'; 


const Modaal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  let categs = ['أشخاص', 'أفعال', 'حروف_الجر', 'ملابس', 'طعام', 'أجهزة_كهربائية', 'غرف_النوم', 'مطبخ', 'غرفة_المعيشة', 'ألوان', 'أسامي_الغرف', 'أدوات_مدرسية']
  //fun fetch w ab3t fel api query{categs[i]} w a7ot elfun de fe click() w a3ml equal lel result m3 detail
  let [detail, setDetail] = useState([])
  let [path, setPath] = useState('')
  let count = 0
  let pathArray;
  let [Name, setName] = useState("")

  if (localStorage.getItem("pathArrays") === null) {
    pathArray = [];
    // console.log("fadyyy")
  }
  else {
    // console.log("msh fadyyy")

    pathArray = JSON.parse(localStorage.getItem("pathArrays"));

  }
  let Ip = '192.168.1.2'
  async function click() {
    setModalVisible(true)
    for (let c = 0; c < 13; c++) {
      if (props.categ == categs[c]) {
        //  console.log(categs[c])
        let response = await fetch(`http://${Ip}:8000/category/?table=${categs[c]}`)
        let finalResponse = await response.json()
        console.log(finalResponse.Names)
        //  finalResponse.Names.map((Names)=>{console.log(Names)})
        //  let categName=(finalResponse.Names).map(name=>name)
        // detail=categName.join("\n")
        setDetail(finalResponse.Names)
        setPath(finalResponse.Paths)
        count = finalResponse.Names.length
        // for(let i=0 ; i<(finalResponse.Names).length;i++)
        // {
        //   console.log(finalResponse.Names[i])



        // }


      }
    }
  }
  async function listen_db(id, Name) {


    console.log(id)
    //setModalVisible(true)
    for (let c = 0; c < 12; c++) {

      if (props.categ == categs[c]) {
        let response = await fetch(`http://${Ip}:8000/findname/?table=${categs[c]}&id=${id}`)
        let finalResponse = await response.json()
        let path = finalResponse.path
        // console.log("Before push again",pathArray)
        // pathArray.push(path)
        // localStorage.setItem("pathArrays",JSON.stringify(pathArray) )
        // console.log(path)
        // console.log(pathArray)
        //da byktb el gomla
        // let obj = { "id": id, "table": categs[c] }
        // pathArray.push(obj)
        // localStorage.setItem("pathArrays", JSON.stringify(pathArray))
        // // console.log(obj)
        // console.log("in listendb", pathArray)

      }
    }
    // setName(Name)
    // console.log(Name)
    // props.func(Name);
  }
  async function writeSent(id,Name)
  {
    console.log(id)
    //setModalVisible(true)
    for (let c = 0; c < 12; c++) {

      if (props.categ == categs[c]) {
        let response = await fetch(`http://${Ip}:8000/findname/?table=${categs[c]}&id=${id}`)
        // let finalResponse = await response.json()
        // let path = finalResponse.path
        // console.log("Before push again",pathArray)
        // pathArray.push(path)
        // localStorage.setItem("pathArrays",JSON.stringify(pathArray) )
        // console.log(path)
        // console.log(pathArray)
        //da byktb el gomla
        let obj = { "id": id, "table": categs[c] }
        pathArray.push(obj)
        localStorage.setItem("pathArrays", JSON.stringify(pathArray))
        // console.log(obj)
        console.log("in listendb", pathArray)

      }
    }
    setName(Name)
    console.log(Name)
    props.func(Name);
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
  //   function listen(name,idx)
  //  {
  //    listen_db(idx+1)
  //    setName(name)
  //    console.log(name)
  //    props.func(name);

  //  }

  // function delete_One(index)
  // {
  //   // function check(){
  //   //      return index
  //   // }
  //   // pathArray.find(check())
  //   pathArray.splice(index,1)
  //   console.log(index)
  //   console.log(pathArray)
  //   console.log("delete one")
  // }
  function clear() {
    // setModalVisible(!modalVisible);
    // pathArray=null
    localStorage.clear()
    if (localStorage.getItem("pathArrays") === null) {
      pathArray = [];
      // console.log("fadyyy")
    }
    else {
      // console.log("msh fadyyy")

      pathArray = JSON.parse(localStorage.getItem("pathArrays"))

    }
    // console.log(pathArray)
    // console.log("clear")

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
          {/* <Text>{Name}</Text> */}

          <View style={styles.modalView}>
          <Icon name='closecircle' size={30} color='white' style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}/>
            {props.details}
            {detail.map((name, index) =>
             <Pressable  style={styles.detail}  key={index}>
              <Text  key={index} style={styles.buttonTextStyle}>
                {/* <Icon onPress={() => { delete_One(index) }} name='delete' size={30} color="white" /> */}
                {name}


                <Icon  style={{marginRight:10}} name="delete" size={30} color='white'/>
                <Icon style={{marginRight:10}} onPress={()=>writeSent(index+1,name)} name='pluscircle' size={30} color='white' />
                <Icon  style={{marginRight:250}} onPress={() => listen_db(index+1,name)} name="play" size={30} color='white'/>        
                </Text>
            </Pressable>)}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => playList()}
            >
              <Text style={styles.TextStyle} >اسمع ما اخترته</Text>
            </Pressable> */}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => clear()}
            >
              <Text style={styles.TextStyle}>الانتقال الى جملة جديدة</Text>
            </Pressable> */}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.TextStyle}>إغلاق</Text>
            </Pressable> */}


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
    // flex:1,
    flexDirection:'column',
    flexWrap:'wrap',
    alignContent:'space-around',
    width:'100%',
    backgroundColor:'#622da4',
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 30,
    fontWeight: 'bold',
    // justifyContent: 'center',
    // textAlign: 'center',
    marginBottom: 20,
    marginTop: 10

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    //   paddingVertical: 10,
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

  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center"
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center"
  // },
  // buttonStyle: {
  //   backgroundColor: '#622da4',
  //   borderWidth: 0,
  //   color: '#FFFFFF',
  //   borderColor: '#7DE24E',
  //   height: 40,
  //   alignItems: 'center',
  //   borderRadius: 30,
  //   // marginLeft: 35,
  //   // marginRight: 35,
  //   marginTop: 50,
  //   marginBottom: 50,
  //   // margin:'auto',
  //   justifyContent:'center',
  //   width:'400%',

  // },
  // buttonTextStyle: {
  //   color: '#FFFFFF',
  //   paddingVertical: 10,
  //   fontSize: 18,
  //   fontWeight:'bold',
  //   padding:25
  // },
});

export default Modaal;