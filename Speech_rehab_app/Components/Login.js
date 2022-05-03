import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native';
export default function Login(props) {
  return (
    <>
    <Text>Login</Text>
    <Button 
    title= 'Login'
    onPress={() =>
     {props.navigation.navigate("Speech")}}
  />
      <Button 
    title= 'Modaal'
    onPress={() =>
     {props.navigation.navigate("Modaal")}}
  />
  </>
  )
}
