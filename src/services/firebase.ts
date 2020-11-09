import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const config = {
  apiKey: "AIzaSyCn_GbtmGlqqlLaWzpII0CjB-PMAheGcj8",
  authDomain: "anonvix.firebaseapp.com",
  databaseURL: "https://anonvix.firebaseio.com",
  projectId: "anonvix",
  storageBucket: "anonvix.appspot.com",
  messagingSenderId: "152829698285",
  appId: "1:152829698285:web:b5ed8bd80e8e8530016ce4",
  measurementId: "G-QG61349B3N"
}

firebase.initializeApp(config)

export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const analytics = firebase.analytics();
export default firebase;
