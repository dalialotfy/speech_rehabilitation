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
 
const RegisterScreen = (props) => {
  let Ip='192.168.1.7'
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(['']);
  const [userRole, setRole] = useState(['']);
  const [text,setText]=useState([])
 let dataToSend = {
  email: userEmail,
    name: userName,
    age: userAge,
    gender:userGender,
    address: userAddress,
    pass: userPassword,
    role: userRole,
  };
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
 function ValidationHandler()
 {
   console.log(userName)
  const Joi = require('joi');
 
  let schema = Joi.object().keys({
      userName: Joi.string().alphanum().min(3).max(30).required(),
      userPassword: Joi.string().regex((/^[a-zA-Z0-9]{3,30}$/)).required(),
      userAge: Joi.number().integer().min(5).max(50).required(),
      userEmail: Joi.string().email({tlds: { allow: ["com", "net"] }}).required(),
      userAddress:Joi.string().alphanum().min(3).max(30).required(),
      userGender:Joi.string().alphanum().min(1).max(30).required(),
      // userRole: Joi.string().alphanum().min(3).max(30).required(),


  })
   
 return schema.validate( {userName:userName,userPassword:userPassword,userGender:userGender,userAge:userAge,userAddress:userAddress,userEmail:userEmail},{abortEarly:false});
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
    let data =await fetch(`http://${Ip}:8000/create`, {
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
  props.navigation.navigate('Login')
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
        <Text style={styles.text}>تسجيل حساب جديد</Text>

{text&&text.map((message,index)=><View key={index} style={{backgroundColor:'#ff9a98',padding:6,width:'98%',borderRadius:5,marginBottom:5,marginTop:5,display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}><Text style={{fontWeight:'bold'}}>{message.message}</Text></View> )}
{/* {errortext&&<View  style={{backgroundColor:'#ff9a98',padding:6,width:'98%',borderRadius:5,marginBottom:5,marginTop:5,display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}><Text style={{fontWeight:'bold'}}>{errortext}</Text></View>} */}
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="أدخل الاسم"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="أدخل الإيميل"
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
              placeholder="أدحل كلمة السر"
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
          <View style={styles.SectionStyle}>
            {/* <Dropdown /> */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userGender) => setUserGender(userGender)}
              underlineColorAndroid="#f000"
              placeholder="النوع"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   emailInputRef.current && emailInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              underlineColorAndroid="#f000"
              placeholder="أدخل عمرك"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              }
              underlineColorAndroid="#f000"
              placeholder="عنوان إقامتك"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            {/* <Dropdown /> */}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userRole) => setRole(userRole)}
              underlineColorAndroid="#f000"
              placeholder="الوظيفة"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   emailInputRef.current && emailInputRef.current.focus()
              // }
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
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}> {loading?<Icon name='loading1' size={30} color="white" /> :' تسجيل'} </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    </>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    display:'flex',
   width:'98%',
    flexDirection: 'row',
    justifyContent:'center',

    height: 50,
    marginTop: 20,
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
    fontWeight:'bold'

  }
});