import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA_IiL14acmXNBxZjepYiOsuNNynVR0kSE",
  authDomain: "crwn-db-ffe89.firebaseapp.com",
  databaseURL: "https://crwn-db-ffe89.firebaseio.com",
  projectId: "crwn-db-ffe89",
  storageBucket: "crwn-db-ffe89.appspot.com",
  messagingSenderId: "565149979658",
  appId: "1:565149979658:web:cdf9804be3047f72c6bbf3",
  measurementId: "G-1VG57W35X3",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
