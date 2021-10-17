import React from 'react'
import { Button, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { Circle } from 'react-native-progress';
import { useState, useEffect } from 'react';
import { db } from '../../logic/db';

export default function DailyMeals(props) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const [data, setData] = useState({
    macros: 0,
    vitamins: 0,
    calories: 0,
    dailyTotals: []
  })


  useEffect(() => {
    const cp = { ...data }

    db.transaction((tx) => {
      tx.executeSql("SELECT macros, vitamins, calories from Diets WHERE diet = 'WeightLoss'", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          cp.macros = rows._array[0]["macros"]
          cp.vitamins = rows._array[0]["vitamins"]
          cp.calories = rows._array[0]["calories"]
        },
        console.error
      )
      tx.executeSql("SELECT SUM(macros), SUM(vitamins), SUM(calories), day FROM DailyMeals GROUP BY day, week", [], (_, { rows }) => {
        cp.dailyTotals = (rows._array)
      })
    }, console.error, () => {
      setData(cp)
    });


  }, [])

  function hasValues(day) {
    for (let dailyTotal of data.dailyTotals) {
      if (day=== dailyTotal.day) {
        return true;
      }
    }
    return false;
  }

  function getTotal(day, totalType){
    let matchingDay;
    for (let dailyTotal of data.dailyTotals){
      if (dailyTotal.day === day){
        matchingDay = dailyTotal;
      }

    }
    switch(totalType){
      case("macros"):
        console.log(matchingDay["SUM(macros)"])
        return matchingDay["SUM(macros)"]
      case("vitamins"):
        return matchingDay["SUM(vitamins)"]

      case("calories"):
        return matchingDay["SUM(calories)"]

    }

  }



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

    <View style= {styles.headerContainer}>
      <Text style = {styles.headerText}>Macros</Text>
      <Text style = {styles.headerText}>Vitamins</Text>
      <Text style = {styles.headerText}>Calories</Text>
    </View>
    {
      days.map(day => {

        return <View style={styles.container} key={day}>
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

          {
            hasValues(day) && <>

              <Circle
                size={50}
                progress={getTotal(day, "macros") / data.macros}
                endAngle={props.progress}
                borderWidth={1}
                thickness={2}
                showsText={true}
                textStyle={{ fontSize: responsiveFontSize(2) }}
                color='white'
                style={styles.progress}
                animated
                formatText={() => {
                  return (getTotal(day, "macros") / data.macros *100).toFixed(0) + '%'
                }}
              />

              <Circle
                size={50}
                progress={getTotal(day, "vitamins") / data.vitamins}
                endAngle={props.progress}
                borderWidth={1}
                thickness={2}
                showsText={true}
                textStyle={{ fontSize: responsiveFontSize(2) }}
                color='white'
                style={styles.progress}
                formatText={() => {
                  return (getTotal(day, "vitamins") / data.vitamins *100).toFixed(0) + '%'
                }}
              />

              <Circle
                size={50}
                progress={getTotal(day, "calories") / data.calories}
                endAngle={props.progress}
                borderWidth={1}
                thickness={2}
                showsText={true}
                textStyle={{ fontSize: responsiveFontSize(2) }}
                color='white'
                style={styles.progress}
                formatText={() => {
                  return (getTotal(day, "calories") / data.calories *100).toFixed(0) + '%'
                }}
              />
            </>
          }
        </View>
      })
    }
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  progress: {
    margin: 10

  },
  headerText:{
    color: "white",
    margin: "3%"

  },
  headerContainer:{
    flexDirection: "row",
    marginLeft: "40%"

  }
});