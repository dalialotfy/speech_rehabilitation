import React from 'react'
import { Text,Button,StyleSheet ,ImageBackground,TouchableOpacity,Image} from 'react-native'
import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
// import { DataTable } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';




export default function Tables(props) {
    console.log(props)
  return (
    <>
     {/* <DataTable.Row >
    <DataTable.Cell numeric style={{borderColor:'#251e51',borderWidth:5}}> {props.hisInfo['5']}</DataTable.Cell>    
    <DataTable.Cell numeric style={{borderColor:'#251e51',borderWidth:5}}> {props.hisInfo['1']}</DataTable.Cell>
    <DataTable.Cell numeric style={{borderColor:'#251e51',borderWidth:5}}> {props.hisInfo['4']} %</DataTable.Cell>
    </DataTable.Row> */}
    <Row textStyle={styles.text} style={styles.rowStyle} borderStyle={{borderWidth: 5, borderColor: '#251e51'}} data={ 
        [props.hisInfo['5'],
        props.hisInfo['1'],
        props.hisInfo['4']+'%']}/>


    </>
  )
}
const styles = StyleSheet.create({

  // head: { height: 40, backgroundColor: '#f1f8ff',marginTop:30 },
  text: { margin: 6 ,color:'white',fontSize:16,fontWeight:'bold',textAlign:'center'},
  rowStyle:{padding:5}


})