import React from 'react'
import AnalysisView from './Home/Analysis';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home(props) {
    const dummyData = {
        nutritionLevel: Math.random(),
        totalCost: 74.5
    }

    return <SafeAreaView style={styles.container}>

        <LinearGradient
            // Background Linear Gradient
            colors={['#DA4453', '#89216B']}
            style={styles.background}
        />

        <Text style={styles.welcomeText}>Hello, Matt!</Text>

        <Text style={styles.promptText}>Start planning your week 🥘</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>Daily meals</Text></TouchableOpacity>

            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>Grocery list</Text></TouchableOpacity>
        </View>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    welcomeText: {
        backgroundColor: 'transparent',
        padding: 50,
        fontSize: 50,
        color: '#fff',
        fontFamily: "sans-serif-light",
        bottom: '25%'
    },

    promptText: {
        backgroundColor: 'transparent',
        fontSize: 25,
        color: '#fff',
        fontFamily: "sans-serif-light",
        bottom: '-15%'

    },

    buttonContainer: {
        flexDirection: 'row',
        bottom: '-40%'

    },
    button: {
        marginBottom: 30,
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