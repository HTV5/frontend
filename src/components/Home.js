import React from 'react'
import AnalysisView from './Home/Analysis';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home(props) {
    const dummyData = {
        macros: Math.random(),
        vitamins: Math.random(),
        calories: Math.random(),
        totalCost: 74.5
    }

    return <SafeAreaView style={styles.container}>

        <LinearGradient
            // Background Linear Gradient
            colors={['#DA4453', '#89216B']}
            style={styles.background}
        />

        <Text style={styles.welcomeText}>Hello, Matt!</Text>

            <AnalysisView {...dummyData} />

        <View style={{ flex: 1 }} />

        <Text style={styles.promptText}>Start planning your week 🥘</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>Daily meals</Text></TouchableOpacity>

            <TouchableOpacity style={styles.button} ><Text style={styles.buttonText}>Grocery list</Text></TouchableOpacity>
        </View>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        backgroundColor: 'black'
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