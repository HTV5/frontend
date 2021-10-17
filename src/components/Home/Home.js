import React from 'react'
import AnalysisView from './Analysis';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../logic/db';

export default function Home(props) {

    const [data, setData] = useState({
        macros: 1,
        vitamins: 1,
        calories: 1,
        totalCost:1
    })

    useEffect(() => {
        const cp = {... data}

        db.transaction((tx) => {
            tx.executeSql("SELECT macros, vitamins, calories from Diets WHERE diet = 'WeightLoss'", [],
            // tx.executeSql("SELECT * from Diets", [],
                (_, { rows }) => {
                    console.log(rows)
                    cp.macros = rows._array[0]["macros"] * 7
                    cp.vitamins = rows._array[0]["vitamins"] * 7
                    cp.calories = rows._array[0]["calories"] * 7
                },
                console.error
            )
            tx.executeSql("SELECT SUM(price) as p FROM GroceryList WHERE price > 0", [], (_, { rows }) => {
                cp.totalCost = rows._array[0]['p']
            })
        }, console.error, () => {
            setData(cp)
        });


    }, [])

    return <SafeAreaView style={styles.container}>

        <LinearGradient
            // Background Linear Gradient
            colors={['#DA4453', '#89216B']}
            style={styles.background}
        />

        <Text style={styles.welcomeText}>Hello, Matt!</Text>
        <Text style={styles.welcomeText2}>Here is your weekly summary</Text>

        <AnalysisView {...data} />

        <View style={{ flex: 1 }} />

        <Text style={styles.promptText}>Start planning your week 🥘</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    props.navigation.navigate("DailyMeals")
                }}
            >
                <Text style={styles.buttonText}>Daily meals</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    props.navigation.navigate("GroceryList")
                }}
            >
                <Text style={styles.buttonText}>Grocery list</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '150%',
    },
    welcomeText: {
        backgroundColor: 'transparent',
        padding: 50,
        fontSize: 50,
        color: '#fff',
        fontFamily: "sans-serif-light",
        flex: 1,
    },
    welcomeText2: {
        backgroundColor: 'transparent',
        padding: 20,
        fontSize: 30,
        color: '#fff',
        fontFamily: "sans-serif-light",
        fontWeight: '300',
        flex: 0,
    },

    promptText: {
        backgroundColor: 'transparent',
        fontSize: 25,
        color: '#fff',
        fontFamily: "sans-serif-light",
        marginBottom: 30
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 50
    },
    button: {
        width: 140,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        margin: 10,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ffffff60",
        borderRadius: 60,
    },
    buttonText: {
        fontFamily: "sans-serif-light",
        color: "white",
        paddingVertical: 30,

    }
});