import React from 'react'
import { FlatList, View } from 'react-native'

export default function GroceryList(props) {

  const { data } = props

  return <View style={{ width: '100%' }}>
    <FlatList 
      data={data}
      renderItem={(item) => (
        <>
        </>
      )}
      keyExtractor={(item) => null}
    />
  </View>
}
