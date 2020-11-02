import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBpvy9GxXRqM8kRbIxg3OvdJWFvgYK4aDw",
  authDomain: "crown-oby-db.firebaseapp.com",
  databaseURL: "https://crown-oby-db.firebaseio.com",
  projectId: "crown-oby-db",
  storageBucket: "crown-oby-db.appspot.com",
  messagingSenderId: "432881218440",
  appId: "1:432881218440:web:5f82f0eedd3fe3cb5f803d",
  measurementId: "G-GGT5717KHN",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    //recuperer uid de l'utilisateur recement connecté
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //recuperer une copie du dernier utilisateur enregister dans la base equivalent a celui connecté
    const snapshot = await userRef.get();
    
    //si il n'existe pas on va le crée
    if (!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set ({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
