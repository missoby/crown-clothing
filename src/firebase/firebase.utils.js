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
    if (!userAuth) return;

    //recuperer uid de l'utilisateur recement connecté
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //recuperer une copie du dernier utilisateur enregister dans la base equivalent a celui connecté
    const snapshot = await userRef.get();


    /*
    recuperer tous les données enregistrer dans firebase qui coneserne les users
    const collectionRef = firestore.collection('users');   
    const collectionSnapshot = await collectionRef.get();
    snapshot de chque donnée
    console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });
    */

    //si il n'existe pas on va le crée
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
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

// pour enregistrer les données du shop dans firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedColection = collections.docs.map(doc => {
        const { title, items } = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, items
        }
    });
    const reducer = (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }
    return transformedColection.reduce(reducer, {})

    /*
    hats: {
        id: 1,
        title: 'Hats',
        routeName: 'hats',
        items: [
        {
            id: 1,
            name: 'Brown Brim',
            imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
            price: 25
        }, 
        ....
    ]
    */
}


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
