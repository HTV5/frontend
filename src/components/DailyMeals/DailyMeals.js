import React from 'react'
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';

export default function DailyMeals(props) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  return <SafeAreaView style={{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100%',
  }}>

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

    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60, }}>


      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{
          padding: 10,
          marginLeft: 10,
          // position: 'absolute'
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
        Plan your days
      </Text>

    </View>
    {
      days.map(day => {

        return <View key={day}>
          <TouchableOpacity
            style={{
              marginLeft: 30,
              backgroundColor: '#ffffff20',
              width: responsiveWidth(30),
              alignItems: 'center',
              borderRadius: 5
            }}
            onPress={() => {
              props.navigation.navigate("MealPlanning", {
                day
              })
            }}
          >
            <Text style={{
              padding: 20,
              fontSize: responsiveFontSize(3),
              fontWeight: '300',
              color: 'white'
            }}>
              {day}
            </Text>
          </TouchableOpacity>
        </View>
      })
    }
  </SafeAreaView>
}