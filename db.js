import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyBuNl20JiLpWhaXyLr-f8qvJHcqWVxiFeU",
  authDomain: "project01-53a6a.firebaseapp.com",
  databaseURL: "https://project01-53a6a.firebaseio.com",
  projectId: "project01-53a6a",
  storageBucket: "project01-53a6a.appspot.com",
  messagingSenderId: "810456971979"
  };

firebase.initializeApp(config)

const db = firebase.firestore()

export default db