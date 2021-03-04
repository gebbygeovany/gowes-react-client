import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBOzyG4fun0gFJK2wHgStHGVHA05T989M8",
    authDomain: "gowes-marketplace-react.firebaseapp.com",
    projectId: "gowes-marketplace-react",
    storageBucket: "gowes-marketplace-react.appspot.com",
    messagingSenderId: "765299973278",
    appId: "1:765299973278:web:8f62e14bb2ff41bc07af8f",
    measurementId: "G-9THGJK5M48"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default};