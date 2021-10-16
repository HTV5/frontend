import React from 'react'
import { View, Text, SafeAreaView } from 'react-native';
import AnalysisView from './Home/Analysis';

export default function Home(props) {
    const dummyData = {
        nutritionLevel: Math.random(),
        totalCost: 74.5
    }

    return <SafeAreaView style={{backgroundColor: 'red'}}>
        <AnalysisView nutritionLevel={dummyData.nutritionLevel} totalCost={dummyData.totalCost}/>
    </SafeAreaView>
}
