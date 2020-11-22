import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateWorker } from '../actions/Worker.action'
import { useRoute } from '@react-navigation/native';

const AddUpdateWorkerPage = ({ navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const { workerId } = route.params;
    const workersFromState = useSelector(state => state.worker.workers)

    const [addWorkerCreds, setWorkerCreds] = useState({ name: '', email: '' })
    const [updateWorkerCreds, setUpdeteWorkerCreds] = useState({})

    if (workerId) {
        useEffect(() => {
            const workerToUpdate = workersFromState.find(worker => worker.id === workerId);
            setUpdeteWorkerCreds({ ...updateWorkerCreds, name: workerToUpdate.name, email: workerToUpdate.email, id: workerToUpdate.id })
        }, [])

    }

    const onAddUpdateWorker = (worker) => {
        dispatch(addUpdateWorker(worker))
        navigation.navigate('Homepage')
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.headerText}>{workerId ? 'Update Worker Page' : 'Add Worker Page'}</Text>
                <TextInput
                    placeholder="Name"
                    onChangeText={(text) => {
                        workerId ? setUpdeteWorkerCreds({ ...updateWorkerCreds, name: text }) :
                            setWorkerCreds({ ...addWorkerCreds, name: text })
                    }}
                    placeholderTextColor='#ffffff'
                    style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => {
                        workerId ? setUpdeteWorkerCreds({ ...updateWorkerCreds, email: text }) :
                            setWorkerCreds({ ...addWorkerCreds, email: text })
                    }}
                    placeholderTextColor='#ffffff'
                    style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <TouchableWithoutFeedback
                    onPress={() => {
                        onAddUpdateWorker(workerId ? updateWorkerCreds : addWorkerCreds)
                    }}>
                    <View style={styles.button} >
                        <Text style={styles.buttonText}>
                            {workerId ? 'Update worker' : 'Add worker'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default AddUpdateWorkerPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#455a64',
        justifyContent: 'center',
        alignItems: 'center'
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
    headerText: {
        color: 'white',
        fontSize: 25,
        marginBottom: 50,
        textAlign: 'center',
    },
    button: {
        textAlign: 'center',
        width: 300,
        backgroundColor: '#1c313a',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        borderRadius: 25,
        marginVertical: 20,
        paddingVertical: 7
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
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
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }

});