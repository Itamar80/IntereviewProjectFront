import React from 'react';
import { StatusBar, StyleSheet,ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Homepage from './src/pages/Homepage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import AddUpdateWorkerPage from './src/pages/AddUpdateWorkerPage';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './src/config/firebaseConfig';
import Logo from './src/components/Logo';

const store = createStore(reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, { attachAuthIsReady: true })
  )
);

const Stack = createStackNavigator()
// ..showsVerticalScrollIndicator
export default function App() {
  return (
    <Provider store={store} >
      <StatusBar backgroundColor='#1c313a' barStyle='light-content' />
      <Logo />
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Homepage'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
          <Stack.Screen name="AddUpdateWorkerPage" component={AddUpdateWorkerPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

