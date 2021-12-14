import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert} from "react-native";
import Header from '../sections/Header';

export default function Contact(props) {

    const [contactInfo, contactInfoSet] = useState({
        msg:"", 
        name: "",
        email: ""
    });
    
    const clearFields=()=> contactInfoSet({name:"", msg: "", email:""});

    const sendMessage=()=> {
        Alert.alert(contactInfo.name, contactInfo.msg);
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header navigation = {props.navigation} message = 'Press to Login'/>
            <Text style={styles.heading}>Contact Us</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => contactInfoSet({...contactInfo, name: text})}
                placeholder= 'Enter Name'
                value={contactInfo.name}
            />

            <TextInput
                style={styles.multiInput}
                onChangeText={(text) => contactInfoSet({...contactInfo, msg: text})}
                placeholder= 'Enter Message' 
                value={contactInfo.msg}
                multiline = {true}
                numberOfLines = {4}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => contactInfoSet({...contactInfo, email: text})}
                placeholder= 'Enter your Email Address'
                value={contactInfo.email}
            />

            <TouchableHighlight onPress={sendMessage} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Send Message
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={clearFields} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Reset Form
                </Text>
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%'
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
    multiInput: {
        flex: 2,
        width: '90%',
        paddingTop: 20
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    }
})