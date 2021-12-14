import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Menu from '../sections/Menu';
import { StackNavigator } from "react-navigation";


export default function Home({navigation}) {

    return (
        <View style = {styles.container}>
            <Header navigation = {navigation} message = "Press to Login" />
            <Hero />
            <Menu navigation = {navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})