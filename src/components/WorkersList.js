import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { deleteWorker } from '../actions/Worker.action'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Colors } from 'react-native-paper';
import axios from 'axios';

const WorkersList = ({ navigation, logout }) => {
    const dispatch = useDispatch()
    const workersFromState = useSelector(state => state.worker.workers);
    const authState = useSelector(state => state.auth);
    const firebase = useSelector(state => state.firebase)
    const { isLoggedIn, loggedInSocialUser, userName } = authState;
    const [imagesUrls, setImagesUrls] = useState([])

    // checking if there is logged in user , if not navigate back to login ,
    // else get pictures for workers 

    useEffect(() => {
        if (!isLoggedIn) {
            navigation.navigate('Login')
        }
        else getRandomPictures()
    }, [isLoggedIn])

    // every time that there is change in the workers , there is a new request to get pictures
    useEffect(() => {
        getRandomPictures()
    }, [workersFromState])

    // simple function to make string capitalize
    const capitalize = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }

    // getting random image from api and associate them with the users
    const getRandomPictures = async () => {
        try {
            const result = await axios.get(`https://randomuser.me/api/?results=${workersFromState.length}`);
            result.data.results.map(result => {
                setImagesUrls(prevImageUrls => [...prevImageUrls, result.picture.medium])
            })
        } catch (err) {
            return
        }
    }

    const renderWorkersList = workersFromState.map((worker, idx) => {
        let { id, name, email } = worker;

        // delete worker action , delete with the worker id
        const onDeleteWorker = (id) => {
            dispatch(deleteWorker(id))
        }

        return (
            <View style={styles.listContainer} key={id}>
                {imagesUrls !== '' && <Image style={styles.randomImage} source={{ uri: `${imagesUrls[idx]}` }} />}
                <View style={styles.listTextContainer}>
                    <Text style={styles.text}>Name : {capitalize(name)}</Text>
                    <Text style={styles.text}>email : {email}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('AddUpdateWorkerPage', { workerId: id })
                }}>
                    <Text >
                        <IconButton
                            icon="account-edit"
                            color={Colors.white}
                            size={20}
                            onPress={() => navigation.navigate('AddUpdateWorkerPage', { workerId: id })}
                        />
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onDeleteWorker(id)}>
                    <Text>
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
                <View>
                    <Text style={styles.header}>Welcome {capitalize(userName)}</Text>
                </View>
                <View style={styles.loggedInUserContainer}>
                    {isLoggedIn ? <Text style={styles.loggedInUser}> {loggedInSocialUser ? 'Social login email:  ' + loggedInSocialUser : 'Logged in email :  ' + firebase.auth.email}</Text> :
                        <Text style={styles.loggedInUser}>No LoggedIn User</Text>}
                    <TouchableWithoutFeedback onPress={() => logout()} style={styles.addWorkerButton}>
                        <View style={styles.logout}>
                            <IconButton
                                style={styles.logoutIcon}
                                icon="logout"
                                color={Colors.white}
                                size={20}
                                onPress={() => logout()}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
                <View style={{ marginTop: 20, marginLeft: 20, maxWidth: 550 }}>{renderWorkersList}</View>
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
    randomImage: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        marginRight: 5
    },
    header: {
        fontSize: 25,
        color: 'white',
        marginBottom: 35
    },
    loggedInUserContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
    },
    loggedInUser: {
        color: 'white',
    },
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listTextContainer: {
        marginBottom: 10
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
    logout: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#1c313a',
        borderRadius: '70%',
        padding: 5,
        marginLeft: 20,
    },
    icon: {
        position: 'relative',
        margin: 0,
        marginLeft: 15,
    },
    logoutIcon: {
        position: 'relative',
        margin: 0,
    },
    text: {
        color: 'white'
    },
    addWorkerButtonText: {
        color: 'white',
        fontWeight: '500',
    }
});