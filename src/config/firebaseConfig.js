import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyB90uY0FqTFbfaKLPum3VfTlKyPjjSfXfo",
    authDomain: "intereviewprojectfirebase.firebaseapp.com",
    databaseURL: "https://intereviewprojectfirebase.firebaseio.com",
    projectId: "intereviewprojectfirebase",
    storageBucket: "intereviewprojectfirebase.appspot.com",
    messagingSenderId: "234297527047",
    appId: "1:234297527047:web:5a72bea8f86b127acf93a2",
    measurementId: "G-TWDPTF9T67"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;