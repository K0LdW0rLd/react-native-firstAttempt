import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList,  TouchableHighlight } from "react-native";
import {QuizData} from '../data/QuizQuestions';
import Questions from '../sections/Questions';

export default function Quiz(props) {
    const [question, questionSet] = useState({
        loaded: false,
        totalScore: 100,
        completedQuiz: false,
        questionList: [],
        numberOfQuestions: 0,
        incorrect: 0,
        questionAnswered: 0
    });

    useEffect(() => {
        const loadQuestions = async () => {
            let numQuestions = Array.from(QuizData.questions).length;
            await questionSet({...question, 
                questionList: Array.from(QuizData.questions),
                loaded: true,
                numberOfQuestions: numQuestions,
            });
        }
        loadQuestions()
    }, [])

    const updateScore = async (penalty) => {
        let tempScore = question.totalScore;
        let missed = question.incorrect;
        let questionsTotal = question.numberOfQuestions;
        let questionsDone = question.questionAnswered;

        let newScore = tempScore - penalty;
        let totalAnswered = questionsDone + 1;
        let totalMissed = penalty ? missed + 1 : missed;

        await questionSet({...question,
            totalScore: newScore,
            incorrect: totalMissed,
            questionAnswered: totalAnswered
        })

        if (totalAnswered === questionsTotal) {
            await questionSet({...question, completedQuiz: true})
        }
    }

    const finishQuiz = async () => {
        props.navigation.navigate('Finish', {
            score: question.totalScore, 
            missed: question.incorrect, 
            questions: question.numberOfQuestions
        })
    }

    return ( 
        <View style={styles.container}>
            {question.loaded && (
                <FlatList 
                    data={question.questionList}
                    renderItem={({item}) =>
                        <Questions 
                            question={item.question}
                            answer1={item.answer1}
                            answer2={item.answer2}
                            answer3={item.answer3}
                            answer4={item.answer4}
                            correctAnswer={item.correctAnswer}
                            scoreUpdate={updateScore}
                        />
                    }
                />
            )}
            { !question.completedQuiz && (
                <TouchableHighlight style={styles.disabled}>
                    <Text>Answer all the questions</Text>
                </TouchableHighlight>
            )}
            { question.completedQuiz && (
                <TouchableHighlight onPress={finishQuiz} style={styles.enabled}>
                    <Text>Finished</Text>
                </TouchableHighlight>
            )}
            { !question.loaded && (
                <Text>LOADING</Text>
            )}
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    disabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        height: '10%'
    },
    enabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90ee90',
        height: '10%'
    }
})