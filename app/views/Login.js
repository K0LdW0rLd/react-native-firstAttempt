import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
    const {navigation, route } = props;
    const [userLogin, userLoginSet] = useState({
        username: '',
        password: '',
    }); 

    const cancelLogin = () => {
        Alert.alert('Login cancelled');
        navigation.navigate('Home');
    }

    const loginUser = () => {
        if (!userLogin.username) {
            Alert.alert('Please enter a username');
        }
        else if (!userLogin.password) {
            Alert.alert('Please enter a password');
        }
        else {
            AsyncStorage.getItem('userLoggedIn', (err, result) => {
                if (result!=='none') {
                    Alert.alert('Someone already logged on');
                    navigation.navigate('Home');
                }
                else {
                    AsyncStorage.getItem(userLogin.username, (err, result) => {
                        if (result!==null) {
                            if (result!==userLogin.password) {
                                Alert.alert('Password incorrect');
                            }
                            else {
                                AsyncStorage.setItem('userLoggedIn', userLogin.username, (err, result) => {
                                    Alert.alert(`${userLogin.username} Logged in`);
                                    navigation.navigate('Home', {username: userLogin.username} );
                                })
                            }
                        }
                        else {
                            Alert.alert(`No account for ${userLogin.username}`);
                        }
                    })
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => userLoginSet({...userLogin, username: text})}
                placeholder= 'Username'
                value={userLogin.username}
            />
            <Text style={styles.label}>Enter Username</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => userLoginSet({...userLogin, password: text})}
                placeholder= '***'
                value={userLogin.password}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Enter Password</Text>

            <TouchableHighlight onPress={loginUser} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Login
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={cancelLogin} underlayColor='#31e981'>
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
