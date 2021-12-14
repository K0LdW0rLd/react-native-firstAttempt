import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register(props) {
    const {navigation, route } = props;
    const [user, userSet] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });

    const cancelRegister = () => {
        Alert.alert('Registration cancelled');
        navigation.navigate('Home');
    }

    const registerAccount = () => {
        if (!user.username) {
            Alert.alert('Please enter a username');
        } 
        else if (user.password !== user.passwordConfirm) {
            Alert.alert('Passwords do not match');
        }
        else {
            AsyncStorage.getItem(user.username, (err, result) => {
                if (result != null) {
                    Alert.alert(`${user.username} already exists`);
                }
                else {
                    AsyncStorage.setItem(user.username, user.password, (err, result) => {
                        Alert.alert(`${user.username} account created`);
                        navigation.navigate('Home');
                    })
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register Account</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => userSet({...user, username: text})}
                placeholder= 'Username'
                value={user.username}
            />
            <Text style={styles.label}>Enter Username</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => userSet({...user, password: text})}
                placeholder= '***'
                value={user.password}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Enter Password</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => userSet({...user, passwordConfirm: text})}
                placeholder= '***'
                value={user.passwordConfirm}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Confirm Password</Text>

            <TouchableHighlight onPress={registerAccount} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Register
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={cancelRegister} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Cancel
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%',
        paddingTop: '10%'
    },
    heading: {
        fontSize: 16,
        flex: 1
    },
    inputs:{
        flex: 1,
        width: '80%',
        padding: 10
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    },
    labels: {
        paddingBottom: 10
    }
})