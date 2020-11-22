import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,ScrollView } from 'react-native';
import { deleteWorker } from '../actions/Worker.action'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Colors } from 'react-native-paper';

const WorkersList = ({ navigation, logout }) => {
    const dispatch = useDispatch()
    const workersFromState = useSelector(state => state.worker.workers);
    const authState = useSelector(state => state.auth);
    const firebase = useSelector(state => state.firebase)
    const { isLoggedIn, loggedInSocialUser } = authState;

    useEffect(() => {
        if (isLoggedIn === false)
            navigation.navigate('Login')
    }, [isLoggedIn])

    useEffect(() => {
    }, [workersFromState])

    const renderWorkersList = workersFromState.map((worker) => {
        let { id, name, email } = worker;

        const onDeleteWorker = (id) => {
            dispatch(deleteWorker(id))
        }

        return (
            <View style={styles.listContainer} key={id}>
                <View style={styles.listTextContainer}>
                    <Text style={styles.text}>Name : {name}</Text>
                    <Text style={styles.text}>email : {email}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('AddUpdateWorkerPage', { workerId: id })
                }}>
                    <Text style={styles.updateWorkerButton}>
                        <IconButton
                            icon="account-edit"
                            color={Colors.white}
                            size={20}
                            onPress={() => navigation.navigate('AddUpdateWorkerPage', { workerId: id })}
                        />
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onDeleteWorker(id)}>
                    <Text style={styles.addWorkerButton}>
                        <IconButton
                            icon="delete"
                            color={Colors.white}
                            size={20}
                            onPress={() => onDeleteWorker(id)}
                        />
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        )
    })
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Workers List</Text>
                {isLoggedIn ? <Text style={styles.loggedInUser}> {loggedInSocialUser ? 'Social login email:  ' + loggedInSocialUser : 'Regular email :  ' + firebase.auth.email}</Text> :
                    <Text style={styles.loggedInUser}>No LoggedIn User</Text>}
                <TouchableWithoutFeedback onPress={() => logout()} style={styles.addWorkerButton}>
                    <Text style={styles.addWorkerButtonText}>Logout</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    style={styles.addWorkerButton}
                    onPress={() => navigation.navigate('AddUpdateWorkerPage', { workerId: null })}>
                    <View style={styles.addWorker}>
                        <Text style={styles.addWorkerButtonText}>Add worker</Text>
                        <IconButton
                            style={styles.icon}
                            icon="account-multiple-plus"
                            color={Colors.white}
                            size={20}
                            onPress={() => navigation.navigate('AddUpdateWorkerPage', { workerId: null })}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View >
                <View style={{ marginTop: 20, marginLeft: 20 }}>{renderWorkersList}</View>
            </View>
        </View>
    )
}

export default WorkersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 35,
        color: 'white',
        marginBottom: 50
    },
    headerContainer: {
        alignItems: 'center',
    },
    loggedInUser: {
        color: 'white',
        marginBottom: 30
    },
    listContainer: {
        flexDirection: 'row',
        paddingBottom: 20

    },
    addWorker: {
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
    updateWorkerButton: {
        marginLeft: 50
    },
    icon: {
        position: 'relative',
        margin: 0,
        marginLeft: 15,
    },
    text: {
        color: 'white'
    },
    addWorkerButtonText: {
        color: 'white',
        fontWeight: '500',
    }
});