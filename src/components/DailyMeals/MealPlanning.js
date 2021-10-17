import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider';
import { responsiveFontSize, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../logic/db';
import { Picker } from '@react-native-picker/picker';


export default function MealPlanning(props) {
  const { day } = props.route.params

  const [meal, setmeal] = useState([])
  const [items, setitems] = useState([])
  const [usage, setusage] = useState([])
  const [selectedItem, setselectedItem] = useState(0)
  const [selectedvalue, setselectedvalue] = useState(0)

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM DailyMeals WHERE day = ? AND week = ? AND meal = ?", [day, 0, 0],
        (_, { rows }) => {
          setmeal(rows._array)
          // console.log("meal: ", rows._array)
        }
      )
      tx.executeSql("SELECT * FROM GroceryList", [],
        (_, { rows }) => {
          setitems(rows._array)
          if (rows._array) setselectedItem(0)
        },
        console.error
      )
      tx.executeSql("SELECT item, SUM(weight) as weight FROM DailyMeals GROUP BY item", [],
        (_, { rows }) => {
          setusage(rows._array)
          // console.log(rows._array)
        }
      )
    })
  }, [])

  useEffect(() => {
    console.log(calculateCurrentWeight(selectedItem))
    setselectedvalue(calculateCurrentWeight(selectedItem))
  }, [meal, items])

  function addItemToMeal(v) {
    if (selectedvalue === 0) return
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO DailyMeals (day, week, meal, item, weight) VALUES (?, ?, ?, ?, ?)",
          [day, 0, 0, items[selectedItem].item, v],
          (_, { rows }) => {
          },
          console.error
        )
        tx.executeSql("SELECT * FROM DailyMeals WHERE day = ? AND week = ? AND meal = ?", [day, 0, 0],
          (_, { rows }) => {
            setmeal(rows._array)
            // console.log("meal: ", rows._array)
          }
        )
        tx.executeSql("SELECT item, SUM(weight) as weight FROM DailyMeals GROUP BY item", [],
          (_, { rows }) => {
            setusage(rows._array)
            // console.log(rows._array)
          }
        )
      }
    )
  }

  function calculateAvailableWeight(ind) {
    if (items.length === 0 || !selectedItem === null) return 0

    const item = items[selectedItem]

    if (calculateCurrentWeight(ind)) {
      let used = 0;
      usage.map(i => {
        if (i.item === item.item)
          used = i['weight']
      })
      // console.log(item.weight, used, calculateCurrentWeight(ind))
      return item.weight - used + calculateCurrentWeight(ind)
    }

    return item.weight
  }

  function calculateCurrentWeight(ind) {
    let ret = 0
    meal.map(i => {
      if (i.item === items[ind]?.item)
        ret = i.weight
    })

    return ret
  }



  return <SafeAreaView style={{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

    <View width={'95%'} style={{borderWidth: 1, padding: 20, borderRadius: 5, borderColor: 'white', backgroundColor: '#ffffff30'}}>

      <Picker
        selectedValue={selectedItem}
        onValueChange={(v, i) => {
          setselectedItem(i)
          setselectedvalue(calculateCurrentWeight(i))
        }}
        style={{ backgroundColor: '#ffffff99', borderRadius: 5 }}
      >
        {
          items.map((item, index) => (
            <Picker.Item label={item.item} value={index} key={item} />
          ))
        }
      </Picker>

      <Slider
        style={{ width: '80%', alignSelf: 'center' }}
        step={1}
        maximumValue={calculateAvailableWeight(selectedItem)}
        minimumTrackTintColor={'white'}
        maximumTrackTintColor={'#ffffff40'}
        onSlidingComplete={v => {
          setselectedvalue(v)
          addItemToMeal(v)
        }}
        value={selectedvalue}
        onValueChange={v => {
        }}
      />
      <Text style={{ textAlign: 'center', color: 'white', textShadowOffset: { width: -2, height: 2 }, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowRadius: 3 }}>
        {items[selectedItem].item} - {selectedvalue}g / {calculateAvailableWeight(selectedItem) + ""}g
      </Text>
    </View>

    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3.5), marginTop: 70, marginBottom: 20, color: 'white' }}>
      Meal contents
    </Text>
    <FlatList
      data={meal}
      renderItem={({ item }) => {
        return <Text key={item.item} style={{ textAlign: 'center', fontSize: responsiveFontSize(2), color: 'white' }}>{item.item} - {item.weight}g</Text>
      }}
    />

    {/* <View>
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
    </View> */}
  </SafeAreaView>
}