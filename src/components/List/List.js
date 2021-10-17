import React, { useEffect, useState } from 'react'
import { FlatList, View, TouchableOpacity, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../logic/db';
import ImagePickerExample from './ImagePicker';

export default function GroceryList(props) {

  const [data, setData] = useState([])
  const [item, setitem] = useState("")
  const [weight, setweight] = useState("")
  const [price, setprice] = useState(5)
  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    db.transaction(
      (tx) => {
        tx.executeSql("SELECT * FROM GroceryList", [],
          (_, { rows }) => {
            setData(rows._array)
            console.log(rows._array)
          },
          (tx, error) => {
            console.error(error)
          }
        )
      }
    )
  }

  function addItem(i, w, p) {
    db.transaction(
      tx => {
        tx.executeSql("INSERT INTO GroceryList (item, weight, price) VALUES (?, ?, ?); ", [i, w, p])
      },
      console.error,
      () => {
        fetch()
      }
    )
  }

  function deleteItem(id) {
    db.transaction(
      tx => {
        tx.executeSql("DELETE FROM GroceryList WHERE id = ?", [id])
      },
      console.error,
      () => {
        fetch()
      }
    )
  }

  return <SafeAreaView style={{ width: '100%', height: '100%' }}>

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
    <ImagePickerExample addItem={addItem}/>
    <View style={{ flexDirection: 'row', justifyContent: 'center', width: responsiveWidth(80), alignSelf: 'center', marginBottom: 20 }}>
      <TextInput style={{ ...styles.listItem, flex: 4 }} value={item} placeholder="add item" placeholderTextColor="#ffffff70"
        onChangeText={(text) => {
          setitem(text)
        }}
      />

      <TextInput style={{ ...styles.listItem, flex: 2 }} value={weight} placeholder="weight" placeholderTextColor="#ffffff70" keyboardType="decimal-pad"
        onChangeText={(text) => {
          setweight(text)
        }} />

        <TextInput
          onChangeText={(text) => {
            setprice(text)
          }}
          style={{ ...styles.listItem, flex: 2 }} value={price} placeholder="$" placeholderTextColor="#ffffff70" keyboardType="decimal-pad" />
      <TouchableOpacity
        style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: '#ffffff80' }}
        onPress={() => {
          if (item.length === 0 || weight === 0 || price === 0 || !item || !weight || !price) return;
          addItem(item, weight, price)
        }}
      >
        <AntDesign name="plus" size={14} color="white" />
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: responsiveWidth(80), alignSelf: 'center' }}>
          <Text style={{ ...styles.listItem, flex: 4 }}>{item.item}</Text>

          <Text style={{ ...styles.listItem, flex: 2 }}>
            {item.weight}g
          </Text>
          <Text style={{ ...styles.listItem, flex: 2 }}>$ {item.price}</Text>
          <TouchableOpacity
            style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: '#ffffff80' }}
            onPress={() => {
              deleteItem(item.id)
            }}
          >
            <AntDesign name="close" size={14} color="white" />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />

  </SafeAreaView>
}

const styles = StyleSheet.create({
  listItem: {
    fontSize: responsiveFontSize(3),
    fontWeight: '300',
    color: 'white',
  }
})