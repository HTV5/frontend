import React, { useEffect, useState } from 'react'
import { FlatList, View, TouchableOpacity, Text, SafeAreaView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../logic/db';
import ImagePickerExample from './ImagePicker';
import { getGeneralStats } from '../../logic/nutrition';
import Modal, { ModalProps } from 'react-native-modal';

export default function GroceryList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalinfo, setmodalinfo] = useState({})
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

      <Modal
        animationType="fade"
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3), marginBottom: 20}}>{modalinfo.serving_size}g of {modalinfo.item}</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>calories: {modalinfo.calories}</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>carbs: {modalinfo.carbs}g</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>fat: {modalinfo.fat}g</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>fiber: {modalinfo.fiber}g</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>potassium: {modalinfo.potassium}g</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>protein: {modalinfo.protein}g</Text>
          <Text style={{color: 'white', fontSize: responsiveFontSize(3)}}>sodium: {modalinfo.sodium}g</Text>
        </View>
      </Modal>
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
    <ImagePickerExample addItem={addItem} />
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
      contentContainerStyle={{ height: responsiveScreenHeight(10) }}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: responsiveWidth(80), alignSelf: 'center' }}>
          <TouchableOpacity
            style={{flex: 4}}
            onPress={async () => {
              getGeneralStats(item.item).then(res => {
                console.log(res)
                setmodalinfo(res)
                setModalVisible(true)
              })
            }}
          >
            <Text style={{ ...styles.listItem, flex: 0 }}>{item.item}</Text>
          </TouchableOpacity>

          <Text style={{ ...styles.listItem, flex: 2 }}>
            {item.weight}g
          </Text>
          <Text style={{ ...styles.listItem, flex: 2 }}>${parseFloat(item.price).toFixed(2)}</Text>
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
  },

})