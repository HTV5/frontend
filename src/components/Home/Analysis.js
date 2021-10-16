import React from 'react'
import { Text, View } from 'react-native'
import { Circle } from 'react-native-progress'
import { responsiveFontSize } from 'react-native-responsive-dimensions'


export default function AnalysisView(props) {

  const { macros, vitamins, calories, totalCost } = props

  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '85%', alignSelf: 'center', backgroundColor: '#ffffff55', padding: 20, borderRadius: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Nutrition title={"Macros"} progress={macros} />
      <Nutrition title={"Vitamins"} progress={vitamins} />
      <Nutrition title={"Calories"} progress={calories} />
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