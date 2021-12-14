import React from 'react';
import { StyleSheet, Text, View, Image } from "react-native";


export default function Hero() {
    return (
        <Image
            style={styles.musicImage}
            source={require('./img/musicLife.jpg')}
        />
    )
}


const styles = StyleSheet.create ({
    musicImage: {
        width: undefined,
        height: undefined,
        flex: 8,
        resizeMode: 'contain',
    }
})
