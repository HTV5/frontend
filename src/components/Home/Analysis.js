import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
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
    const cp = { ...data }

    db.transaction((tx) => {
      tx.executeSql("SELECT SUM(macros) from DailyMeals WHERE day = 'SUN' GROUP BY day", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          console.log(rows._array[0]["SUM(macros)"])
          cp.currentMacros = rows._array[0]["SUM(macros)"]
        },
        console.error
      );

      tx.executeSql("SELECT SUM(vitamins) from DailyMeals WHERE day = 'SUN' GROUP BY day", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          cp.currentVitamins = rows._array[0]["SUM(vitamins)"]
        },
        console.error
      );

      tx.executeSql("SELECT SUM(calories) from DailyMeals WHERE day = 'SUN' GROUP BY day", [],
        // tx.executeSql("SELECT * from Diets", [],
        (_, { rows }) => {
          cp.currentCalories = rows._array[0]["SUM(calories)"]
        },
        console.error
      );
    })
    setData(cp)
  }, [])


  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '85%', alignSelf: 'center', backgroundColor: '#ffffff55', padding: 20, borderRadius: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Nutrition title={"Macros"} progress={data.currentMacros / macros} />
      <Nutrition title={"Vitamins"} progress={data.currentVitamins / vitamins} />
      <Nutrition title={"Calories"} progress={data.currentCalories / calories} />
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', margin: 20, marginTop: 40 }}>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: responsiveFontSize(2.3), color: 'white' }}>
          Total cost
        </Text>
        <Text style={{ color: 'white', fontSize: responsiveFontSize(3.3), fontWeight: 'bold' }}>
          $ {totalCost}
        </Text>
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: responsiveFontSize(2.3), color: 'white' }}>
          Per day
        </Text>
        <Text style={{ color: 'white', fontSize: responsiveFontSize(3.3), fontWeight: 'bold' }}>
          $ {(totalCost / 7).toFixed(2)}
        </Text>
      </View>

    </View>

  </View>
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
      formatText={n => { return `${Math.round(n * 100)}% ` }}
      indeterminate={props.progress ? false : true}
      color='white'
    />
  </View>
}