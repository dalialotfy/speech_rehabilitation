import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
export default function Dropdown(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Gender");
    const [items, setItems] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
    ]);
  return (
    <DropDownPicker style={styles.drop}
      open={open}
      value={"Gender"}
      items={['Male','Female']}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />  )
}



const styles = StyleSheet.create({

    drop:
    {
      
        flex:1,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        borderColor:'white',
        borderRadius:30
       
    },});