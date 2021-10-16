import React, { useRef } from 'react'
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

export default function MealPlanning(props) {
  const { day } = props.route.params

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function addMeal() {
    onOpen();


  }



  return <SafeAreaView style={{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  }}>
    <Modalize ref={modalizeRef}><Text>test</Text></Modalize>

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
        {day}
      </Text>
    </View>

    <Text style={{ color: 'white', fontSize: responsiveFontSize(2), marginBottom: 60, marginTop: 20 }}>
      Plan your meals for the day
    </Text>

    <View>
      <TouchableOpacity 
      onPress={() => {
        addMeal()
      }}
      style={{
        backgroundColor: '#ffffff40',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(40),
        borderRadius: 5,
        marginTop: 20
      }}>
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
}