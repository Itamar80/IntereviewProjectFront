import React, { useEffect } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadWorkers } from '../actions/Worker.action'
import WorkersList from '../components/WorkersList';
import { signOut } from '../actions/Auth.actions';

const Homepage = ({ navigation }) => {
    const dispatch = useDispatch()
    const workerState = useSelector(state => state.worker)

    const logout = () => {
        dispatch(signOut());
        navigation.navigate('Login');
    }

    useEffect(() => {
        dispatch(loadWorkers())
    }, [])

    return (
        <View style={styles.container}>
    <ScrollView>
            {workerState.workers && workerState.workers.length &&
                <WorkersList navigation={navigation} workers={workerState.workers} logout={logout} />}
    </ScrollView>
        </View>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
    },
    logo: {
        flex: .4
    }
});