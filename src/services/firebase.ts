import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const config = {

}

firebase.initializeApp(config)

export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const analytics = firebase.analytics();
export default firebase;
