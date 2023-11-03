import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyCzc-3Oimz-774e2xU8kazVkH2nYSZnCK0',
    authDomain: 'login-bf9a4.firebaseapp.com',
    projectId: 'login-bf9a4',
    storageBucket: 'login-bf9a4.appspot.com',
    messagingSenderId: '387133225634',
    appId: '1:387133225634:web:11fe6b8c6323cd0ff135fb',
    measurementId: 'G-6DTNR64ZWT',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth, analytics };
export default firebase;
