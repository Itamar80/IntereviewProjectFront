import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';

const Form = ({ onSubmitClick, onChangeRoute, facebookLogin, googleLogin, type, bottunText }) => {
    const route = useRoute();
    const [userCred, setUserCred] = useState({ email: '', password: '' })
    const [isValidInput, setIsValidInput] = useState(true)
    const [emailInputText, setEmailInputText] = useState('')

    // valitadion of email input
    const handleText = (text) => {
        if (text.includes('@')) {
            setIsValidInput(true)
        }
        setEmailInputText(text)
        setUserCred({ ...userCred, email: text })
    }
    // submiting the form content
    const handleSubmit = () => {
        if (!emailInputText.includes('@')) {
            setIsValidInput(false)
            return
        }
        onSubmitClick(userCred)
    }
    return (
        <View styles={styles.container} >
            {!isValidInput && <Text style={{ color: 'red', marginLeft: 15 }}>Email or Password is not valid</Text>}
            <TextInput
                placeholder="Email"
                onChangeText={(text) => handleText(text)}
                placeholderTextColor='#ffffff'
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
            {
                route.name === 'Register' && < TextInput
                    placeholder="User Name"
                    placeholderTextColor='#ffffff'
                    style={styles.input}
                    onChangeText={(text) => setUserCred({ ...userCred, name: text })}
                    underlineColorAndroid='rgba(0,0,0,0)' />
            }
            < TextInput
                placeholder="Password"
                placeholderTextColor='#ffffff'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setUserCred({ ...userCred, password: text })}
                underlineColorAndroid='rgba(0,0,0,0)' />
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.facebookButton} onPress={() => facebookLogin()}>
                <View style={styles.iconContainer}>
                    <IconButton
                        icon="facebook"
                        color={Colors.white}
                        size={20}
                        onPress={() => facebookLogin()}
                    />
                    <Text style={styles.buttonText}>Login With Facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.facebookButton} onPress={() => googleLogin()}>
                <View style={styles.iconContainer}>
                    <IconButton
                        icon="gmail"
                        color={Colors.white}
                        size={20}
                        onPress={() => facebookLogin()}
                    />
                    <Text style={styles.buttonText}> Login With Google</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.signupTextContainer}>
                <Text style={styles.signupText}> Don't have an account yet?</Text>
                <TouchableWithoutFeedback onPress={() => onChangeRoute()}>
                    <Text style={styles.signupButton}> {bottunText}</Text>
                </TouchableWithoutFeedback>

            </View>
        </View >
    )
}

export default Form

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    facebookButton: {
        width: 300,
        backgroundColor: '#385898',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 3
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    iconContainer: {
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: 'row'
    },
    signupTextContainer: {
        flexGrow: .3,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,.7)',
        fontSize: 16,
        marginRight: 7
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
        position: 'absolute',
        top: -50,
        right: -25
    }
});