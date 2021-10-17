import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Circle } from 'react-native-progress'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { db } from '../../logic/db';
import { useState } from 'react';


export default function AnalysisView(props) {

  const [data, setData] = useState({
    currentMacros: 0,
    currentVitamins: 0,
    currentCalories: 0,
    totalCost: 0
  })

  const { macros, vitamins, calories, totalCost } = props

  //Get today's total macros, vitamins and calories so you can divide them by respective values above
  useEffect(() => {
    calc()
  }, [])

  function calc() {
    const cp = { ...data }

    db.transaction((tx) => {
      tx.executeSql("SELECT SUM(macros) from DailyMeals GROUP BY week", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          if (rows.length) {

            cp.currentMacros = rows._array[0]["SUM(macros)"]
          }
        },
        console.error
      );

      tx.executeSql("SELECT SUM(vitamins) from DailyMeals GROUP BY week", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          if (rows.length) {
            cp.currentVitamins = rows._array[0]["SUM(vitamins)"]
          }
        },
        console.error
      );

      tx.executeSql("SELECT SUM(calories) from DailyMeals GROUP BY week", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          if (rows.length) {

            cp.currentCalories = rows._array[0]["SUM(calories)"]
            console.log(cp.currentCalories)
          }
        },
        console.error
      );
    })
    setData(cp)
  }


  return <TouchableOpacity
    onPress={() => {
      calc()
    }}
    style={{ flexDirection: 'column', alignItems: 'center', width: '85%', alignSelf: 'center', backgroundColor: '#ffffff55', padding: 20, borderRadius: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Nutrition title={"Macros"} progress={data.currentMacros / macros} />
      <Nutrition title={"Vitamins"} progress={data.currentVitamins / vitamins} />
      <Nutrition title={"Calories"} progress={data.currentCalories / calories} />
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', margin: 20, marginTop: 40 }}>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: responsiveFontSize(2.3), color: 'white' }}>
          This week
        </Text>
        <Text style={{ color: 'white', fontSize: responsiveFontSize(3.3), fontWeight: 'bold' }}>
          $ {totalCost}
        </Text>
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: responsiveFontSize(2.3), color: 'white' }}>
          Daily
        </Text>
        <Text style={{ color: 'white', fontSize: responsiveFontSize(3.3), fontWeight: 'bold' }}>
          $ {(totalCost / 7).toFixed(2)}
        </Text>
      </View>

    </View>

  </TouchableOpacity>
}

function Nutrition(props) {

  return <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '300', color: 'white', paddingBottom: 10 }}>
      {props.title}
    </Text>
    <Circle
      size={50}
      progress={props.progress}
      endAngle={props.progress}
      borderWidth={1}
      thickness={2}
      showsText={true}
      textStyle={{ fontSize: responsiveFontSize(2) }}
      indeterminate={props.progress ? false : true}
      color='white'
    />
  </View>
}