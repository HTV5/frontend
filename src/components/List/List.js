import React, { useEffect, useState } from 'react'
import { FlatList, View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../logic/db';

export default function GroceryList(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql("SELECT * FROM GroceryList", [],
          (_, { rows }) =>
            console.log(rows._array),
          (tx, error) => {
            console.error(error)
          }
        )
      }
    )
  }, [])

  return <SafeAreaView style={{ width: '100%', height:'100%' }}>

    <LinearGradient
      // Background Linear Gradient
      colors={['#DA4453', '#89216B']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '120%',
      }}
    />

    <View style={{ marginTop: 30, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>


      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{
          padding: 10,
          marginLeft: 10,
          position: 'absolute',
          zIndex: 5,
          // backgroundColor: '#ffffff30'
        }}>
        <AntDesign name="back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={{
        flex: 1,
        color: 'white',
        fontSize: responsiveFontSize(5),
        fontWeight: '300',
        textAlign: 'center',
        // width: '100%'
      }}>
        My List
      </Text>
    </View>
    <FlatList
      data={data}
      renderItem={(item) => (
        <>
        </>
      )}
      keyExtractor={(item) => null}
    />
  </SafeAreaView>
}
