import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function Finish(props) {
    const {navigation, route } = props;
    let userScore = route.params.score;
    let questionsMissed = route.params.missed;
    let totalQuestions = route.params.questions;

    const exitQuiz= () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text>Your quiz score was {userScore}</Text>
            <Text>You missed on {questionsMissed} out of {totalQuestions} questions</Text>

            <TouchableHighlight onPress={exitQuiz} style={styles.button}>
                <Text>Finish Quiz</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%'
    }
})