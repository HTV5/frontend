import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import DailyMeals from './src/components/DailyMeals/DailyMeals';
import MealPlanning from './src/components/DailyMeals/MealPlanning';
import { db } from './src/logic/db';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, photo TEXT, journal TEXT, emotions TEXT, date TEXT, timestamp DATETIME)"
    //   );
    // });
  }, [])
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DailyMeals" component={DailyMeals} />
      <Stack.Screen name="MealPlanning" component={MealPlanning} />
    </Stack.Navigator>
  </NavigationContainer>
}
