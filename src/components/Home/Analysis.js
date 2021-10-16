import React from 'react'
import { Text, View } from 'react-native'
import { Circle } from 'react-native-progress'


export default function AnalysisView(props) {

  const { nutritionLevel, totalCost } = props

  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '90%', alignSelf: 'center', backgroundColor: '#ffffff80', padding: 20, borderRadius: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Nutrition title={"Macros"} progress={nutritionLevel} />
      <Nutrition title={"Vitamins"} progress={nutritionLevel} />
      <Nutrition title={"Calories"} progress={nutritionLevel} />
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', margin: 20, marginTop: 40 }}>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 18, color: 'white' }}>
          Total cost
        </Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
          $ {totalCost}
        </Text>
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 18, color: 'white' }}>
          Per day
        </Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
          $ {(totalCost / 7).toFixed(2)}
        </Text>
      </View>

      {/* <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            <Text style={{ color: '#00cc00' }}>$ {totalCost}</Text>
            <Text> total </Text>
          </Text>

          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            <Text style={{ color: '#00cc00' }}>$ {(totalCost / 7).toFixed(2)}</Text>
            <Text> / day</Text>
          </Text> */}

    </View>

  </View>
}

function Nutrition(props) {

  return <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={{ fontSize: 25, fontWeight: '300', color: 'white', paddingBottom: 10 }}>
      {props.title}
    </Text>
    <Circle
      size={50}
      progress={props.progress}
      endAngle={props.progress}
      borderWidth={1}
      thickness={2}
      showsText={true}
      textStyle={{ fontSize: 20 }}
      formatText={n => { return `${Math.round(n * 100)}% ` }}
      indeterminate={props.progress ? false : true}
      color='white'
    />
  </View>
}