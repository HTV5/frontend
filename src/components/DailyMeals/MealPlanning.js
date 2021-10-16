import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Picker, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider';
import { responsiveFontSize, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { db } from '../../logic/db';

export default function MealPlanning(props) {
  const { day } = props.route.params

  const [meal, setmeal] = useState([])
  const [meals, setmeals] = useState([])
  const [mealNum, setmealNum] = useState(0)
  const [items, setitems] = useState([])
  const [usage, setusage] = useState([])
  const [selectedItem, setselectedItem] = useState(0)
  const [selectedvalue, setselectedvalue] = useState(0)

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM GroceryList", [],
        (_, { rows }) => {
          setitems(rows._array)
          if (rows._array) setselectedItem(0)
        }
      )
      tx.executeSql("SELECT item, SUM(weight) as weight FROM DailyMeals GROUP BY item", [],
        (_, { rows }) => {
          setusage(rows._array)
          console.log(rows._array)
        }
      )
    })
  }, [])

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    setselectedvalue(calculateCurrentWeight(0))
  }, [meal])

  function addMeal() {
    db.transaction(
      tx => {
        tx.executeSql("SELECT * FROM DailyMeals WHERE day = ? AND week = ? AND meal = ?", [day, 0, meals.length],
          (_, { rows }) => {
            setmeal(rows._array)
            console.log("meal: ", rows._array)
          }
        )
      }
    )
    onOpen();
  }

  function addItemToMeal() {
    if (selectedvalue === 0) return
    console.log(items[selectedItem].item)
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO DailyMeals (day, week, meal, item, weight) VALUES (?, ?, ?, ?, ?)", [day, 0, mealNum, items[selectedItem].item, selectedvalue],
          (_, { rows }) => {

          },
          console.error
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
      console.log(item.weight, used, calculateCurrentWeight(ind))
      return item.weight - used + calculateCurrentWeight(ind)
    }

    return item.weight
  }

  function calculateCurrentWeight(ind) {
    let ret = 0
    meal.map(i => {
      if (i.item === items[ind].item)
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
    <Modalize
      ref={modalizeRef}
      modalTopOffset={responsiveScreenHeight(30)}
    >
      <Picker
        selectedValue={selectedItem}
        onValueChange={(v, i) => {
          setselectedItem(i)
          setselectedvalue(calculateCurrentWeight(i))
        }}
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
        onSlidingComplete={v => {
          addItemToMeal(v)
        }}
        value={selectedvalue}
        onValueChange={v => {
          setselectedvalue(v)
        }}
      />
      <Text style={{ textAlign: 'center' }}>
        {selectedvalue}g / {calculateAvailableWeight(selectedItem) + ""}g
      </Text>

      <Text style={{textAlign: 'center', fontSize: responsiveFontSize(3.5), marginTop: 70, marginBottom: 20}}>
        Meal {mealNum + 1} contents
      </Text>
      <FlatList 
        data={meal}
        renderItem={({item}) => {
          console.log("item: ", item)
          return <Text key={item.item} style={{textAlign: 'center', fontSize: responsiveFontSize(2)}}>{item.item} - {item.weight}g</Text>
        }}
      />
    </Modalize>

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