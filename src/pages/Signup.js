import React, { useEffect, useState } from 'react';
import { StatusBar, Modal, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Form from '../components/Form'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../actions/Auth.actions';
import firebase from 'firebase';
import { signInWithFacebook, signInWithGoogle } from '../actions/Auth.actions';

const Signup = ({ navigation }) => {
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const onSubmitClick = (userCreds) => {
        dispatch(signUp(userCreds))
    }
    const googleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                dispatch(signInWithGoogle(user))

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const facebookLogin = () => {
        firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            dispatch(signInWithFacebook(user))
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    useEffect(() => {
        if (authState.isLoggedIn) {
            navigation.navigate('Homepage')
        }
    }, [authState.isLoggedIn])

    const Modal = () => {
        return (
            <View style={styles.modal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableHighlight
                            onPress={() => {
                                dispatch(resetAuthError())
                            }}
                        >
                            <IconButton
                                style={styles.buttonIcon}
                                icon="close"
                                color={Colors.black}
                                size={18}
                                onPress={() => dispatch(resetAuthError())
                                }
                            />
                            {/* <Text style={styles.textStyle}>Close modal</Text> */}
                        </TouchableHighlight>
                        <Text style={styles.modalHeader}>Error Message</Text>
                        {authState.authError ? <Text style={styles.modalText}>{authState.authError}</Text> :
                            <Text>Couldn't Sign in,try again</Text>}

                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {authState.authError && <Modal />}
            <Form authError={authState.authError} googleLogin={googleLogin} facebookLogin={facebookLogin} onSubmitClick={onSubmitClick} navigation={navigation} navigateTo='Login' type='Signup' bottunText='Sign in' />
        </View>
    )
}

export default Signup


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#455a64',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        position: 'absolute',
        zIndex: 2,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonIcon: {
        position: 'absolute',
        left: -130,
        top: -30
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});