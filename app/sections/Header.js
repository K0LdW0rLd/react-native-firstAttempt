import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header (props) {
    const [user, userSet] = useState({
        loggedIn: false,
        loggedUser: false
    })

    const toggleUser = () => {
        if(user.loggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', async (err, result) => {
                await userSet({
                    loggedIn: false,
                    loggedUser: false
                })
                Alert.alert('User logged out');
            })
        }
        else {
            props.navigation.navigate('Login');
        }
    }

    const updateUser = async (user) => {
        await userSet({
            loggedIn: true,
            loggedUser: user
        })
    }

    useEffect(() => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if(result === 'none') {
                console.log('None');
            }
            else if (result === null) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('Set user to NONE');
                })
            }
            else {
                // loggedUserSet(result)
                updateUser(result)
            }
        })
    }, [])

    return (
        <View style={styles.headStyle}>
            <Image 
                style={styles.logoStyle}
                source={require('./img/logo.png')}
                />
            <Text  
                style={styles.headText} 
                onPress={toggleUser}>
                    {user.loggedIn ? user.loggedUser : props.message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20,
        flex: 1,
        paddingTop: 20,
    }, 
    headStyle: {
        paddingTop: 10,
        paddingRight: 20,
        backgroundColor: '#35605a',
        flex: 2,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000000'
    },
    logoStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    }
})