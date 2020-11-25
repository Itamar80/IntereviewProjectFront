import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workerReducer from './workerReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// function to publish all the reducers to the app
export default combineReducers({
    auth: authReducer,
    worker: workerReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})