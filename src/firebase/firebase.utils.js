import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyBpvy9GxXRqM8kRbIxg3OvdJWFvgYK4aDw",
    authDomain: "crown-oby-db.firebaseapp.com",
    databaseURL: "https://crown-oby-db.firebaseio.com",
    projectId: "crown-oby-db",
    storageBucket: "crown-oby-db.appspot.com",
    messagingSenderId: "432881218440",
    appId: "1:432881218440:web:5f82f0eedd3fe3cb5f803d",
    measurementId: "G-GGT5717KHN"
  };

  firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;