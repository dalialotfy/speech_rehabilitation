import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
export default function Dropdown() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("ffff");
    const [items, setItems] = useState([
      {label: 'Apple', value: 'a'},
      {label: 'Banana', value: 'b'}
    ]);
  return (
    <DropDownPicker style={styles.drop}
      open={open}
      value={value}
      items={items}
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
       
    },});