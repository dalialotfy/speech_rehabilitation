import React, { Component } from 'react';
import { Text, View,StyleSheet,Button } from "react-native";

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Speech from './Components/Speech';
import Assistant from './Components/Assistant';
// import Ass from './Components/Ass';
import Coach from './Components/Coach';
import Dropdown from './Components/Dropdown';
import Modaal from './Components/Modaal';
import 'text-encoding-polyfill'
// import 'localstorage-polyfill'; 


const Stack = createStackNavigator();
export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Speech Rehabilitation App"
            component={Home}
            options={{title:'تطبيق تأهيل النطق'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title:'تسجيل الدخول'}}

          />
                    <Stack.Screen
            name="Register"
            component={Register}
            options={{title:'تسجيل '}}

          />
            <Stack.Screen
            name="Speech"
            component={Speech}
            options={{title:'تأهيل النطق'}}

          />
          <Stack.Screen
            name="Assistant"
            component={Assistant}
            options={{title:'المساعد '}}

          />
                    {/* <Stack.Screen
            name="Ass"
            component={Ass}
            options={{title:'المساعد '}}

          /> */}
        <Stack.Screen
            name="Coach"
            component={Coach}
            options={{title:'المدرب'}}

          />
          <Stack.Screen
            name="Modaal"
            component={Modaal}
          />
        </Stack.Navigator>
      </NavigationContainer>

  )
}




