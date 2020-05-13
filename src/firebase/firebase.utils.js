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

export const getUserCartRef = async (userId) => {
  if (!userId) return;
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const cartSnapshot = await cartsRef.get();

  if (cartSnapshot.empty) {
    const cartDoc = firestore.collection("carts").doc();
    await cartDoc.set({
      userId,
      cartItems: [],
    });
    return cartDoc;
  } else {
    return cartSnapshot.docs[0].ref;
  }
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach((object) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { id } = doc;
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default firebase;
