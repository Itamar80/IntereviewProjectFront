import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateWorker } from '../actions/Worker.action'
import { useRoute } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';

const AddUpdateWorkerPage = ({ navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch()
    const { workerId } = route.params;
    const workersFromState = useSelector(state => state.worker.workers)
    const [isValidInput, setIsValidInput] = useState(true)

    const [addWorkerCreds, setWorkerCreds] = useState({ name: '', email: '' })
    const [updateWorkerCreds, setUpdeteWorkerCreds] = useState({})
    const [addingError, setAddingError] = useState('')

    // if there is worker id the component is going to update worker , else adding worker.
    if (workerId) {
        useEffect(() => {
            const workerToUpdate = workersFromState.find(worker => worker.id === workerId);
            setUpdeteWorkerCreds({ ...updateWorkerCreds, name: workerToUpdate.name, email: workerToUpdate.email, id: workerToUpdate.id })
        }, [])

    }

    // Sending worker to update/add, first checking if there is worker with the same creds.
    const onSubmitForm = (worker) => {
        const sameCredsWorker = workersFromState.find(workerFromState => {
            return workerFromState.name.toLowerCase() === worker.name.toLowerCase() ||
                workerFromState.email.toLowerCase() === worker.email.toLowerCase()
        })
        if (sameCredsWorker) {
            setAddingError('This worker is already in the system , please re-enter ')
        } else {
            if (!worker.email.includes('@')) {
                setAddingError('Your email section is not valid , please re-enter email')
            } else {
                dispatch(addUpdateWorker(worker))
                navigation.navigate('Homepage')
            }
        }
    }

    // decide where to send the creds (update or add)
    const addOrUpdate = ({ key }, text) => {
        workerId ? setUpdeteWorkerCreds({ ...updateWorkerCreds, [key]: text }) :
            setWorkerCreds({ ...addWorkerCreds, [key]: text })
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.navigateBack}
                onPress={() => navigation.navigate('Homepage')}>
                <View style={styles.iconContainer}>
                    <IconButton
                        icon="home"
                        color={Colors.white}
                        size={30}
                        onPress={() => navigation.navigate('Homepage')}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1 }}>
                <Text style={styles.headerText}>{workerId ? 'Update Worker Page' : 'Add Worker Page'}</Text>
                {addingError !== '' && <Text style={styles.addingError}>{addingError}</Text>}
                <TextInput
                    placeholder="Name"
                    onChangeText={(text) => addOrUpdate({ key: 'name' }, text)}
                    placeholderTextColor='#ffffff'
                    style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => addOrUpdate({ key: 'email' }, text)}
                    placeholderTextColor='#ffffff'
                    style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                <TouchableWithoutFeedback
                    onPress={() => {
                        onSubmitForm(workerId ? updateWorkerCreds : addWorkerCreds)
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
    },
    iconContainer: {
        position: 'absolute',
        top: -11,
        left: -5,
    },
    addingError: {
        color: 'red'
    }

});