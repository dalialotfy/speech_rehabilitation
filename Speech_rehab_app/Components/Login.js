import React, {useState, createRef} from 'react';
// import Joi from 'joi'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import Dropdown from './Dropdown';
// import Loader from './Components/Loader';
 
const Login= (props) => {
  let Ip='192.168.1.2'

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(['']);
  const [text,setText]=useState([])
 let dataToSend = {
  email: userEmail,
    pass: userPassword,
  };
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
 function ValidationHandler()
 {

  const Joi = require('joi');
 
  let schema = Joi.object().keys({
      userPassword: Joi.string().regex((/^[a-zA-Z0-9]{3,30}$/)).required(),
      userEmail: Joi.string().email({tlds: { allow: ["com", "net"] }}).required(),

  })
   
 return schema.validate( {userPassword:userPassword,userEmail:userEmail},{abortEarly:false});
 }
  async function handleSubmitButton() {
    let validationRespone=ValidationHandler()
    console.log(dataToSend)
    console.log(validationRespone)
    console.log(text)
    setLoading(true)
   if(validationRespone.error)
   {
     setText(validationRespone.error.details)
     console.log(validationRespone.error.details)
     setLoading(false)
    //  alert(validationRespone.error)
   }
   else{
    setText([])
    let data =await fetch(`http://${Ip}:8000/logIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...dataToSend


      })
    });  
let respone = await data.json()
  console.log(respone.message)
    if (respone.message=='Success')
    {
         //Navigate To login
  props.navigation.navigate('Speech')
         setLoading(false)
    }
     else
     {
       console.log("else")
       setLoading(false)
       //y3rd el false de
       setErrortext(respone.message)

     }

  } //post request if data.message=='sucess' >setLoadingfalse+ yro7 lel login else>serloading false w y3rd el error data.message
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);

      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join(',');
    console.log(dataToSend)
};

  return (
    <>
 

    <View style={{flex: 1, backgroundColor: '#251e51',justifyContent:'center'}}>
  
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
        </View>
        <KeyboardAvoidingView enabled>
        <Text style={styles.text}>LOG IN</Text>

{text&&text.map((message,index)=><View key={index} style={{backgroundColor:'#ff9a98',padding:6,width:'98%',borderRadius:5,marginBottom:5,marginTop:5,display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}><Text style={{fontWeight:'bold'}}>{message.message}</Text></View> )}
{/* {errortext&&<View  style={{backgroundColor:'#ff9a98',padding:6,width:'98%',borderRadius:5,marginBottom:5,marginTop:5,display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}><Text style={{fontWeight:'bold'}}>{errortext}</Text></View>} */}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>


          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={handleSubmitButton}
            onPress={ ()=>{props.navigation.navigate('Speech')}  }
            >
            <Text style={styles.buttonTextStyle}> {loading?<Icon name='loading1' size={30} color="white" /> :' LOG IN'} </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  SectionStyle: {
    display:'flex',
   width:'98%',
    flexDirection: 'row',
    justifyContent:'center',

    height: 60,
    marginTop: 30,
    // marginLeft: 35,
    // marginRight: 35,
    margin: 'auto',
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
    marginBottom: 20,
    margin:'auto',
    justifyContent:'center',
    width:'40%'
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold'
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  text:
  {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    padding: 5,
    fontWeight:'bold',
    marginTop:70

  }
});