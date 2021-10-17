import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import DailyMeals from './src/components/DailyMeals/DailyMeals';
import MealPlanning from './src/components/DailyMeals/MealPlanning';
import { db } from './src/logic/db';
import GroceryList from './src/components/List/List';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    db.transaction((tx) => {

      //       tx.executeSql("DROP TABLE GroceryList;", [], console.log, console.error)
      // tx.executeSql("DROP TABLE Diets;", [], console.log, console.error)
      // tx.executeSql("DROP TABLE DailyMeals;", [], console.log, console.error)
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS GroceryList (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, weight FLOAT, price FLOAT)"
      );
      // tx.executeSql(
        // "INSERT INTO GroceryList (item, weight, price) VALUES ('apples', 200, 3), ('oranges', 120, 3), ('ice cream', 300, 3);", [],
        // "DELETE FROM GroceryList;",[],
        // "select * from GroceryList", [],

      //   console.log,
      //   console.error
      // )

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Diets (id INTEGER PRIMARY KEY AUTOINCREMENT, diet TEXT, macros FLOAT, vitamins FLOAT, calories FLOAT)"
      );
      tx.executeSql(
        "INSERT INTO Diets(diet, macros, vitamins, calories) SELECT 'WeightLoss', 50, 5, 1200 WHERE NOT EXISTS(SELECT * FROM Diets)"
      )

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS DailyMeals (day TEXT, week INTEGER, meal TEXT, item TEXT, weight FLOAT, macros FLOAT, vitamins FLOAT, calories FLOAT, UNIQUE(day, week, meal, item))"
      );

    });
  }, [])

  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GroceryList" component={GroceryList} />
      <Stack.Screen name="DailyMeals" component={DailyMeals} />
      <Stack.Screen name="MealPlanning" component={MealPlanning} />
    </Stack.Navigator>
  </NavigationContainer>
}
