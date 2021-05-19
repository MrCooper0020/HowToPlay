import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBLmB7PzKRscHk6xOh1HrNIy-GbcBDUvm4",
    authDomain: "how-to-play-17b44.firebaseapp.com",
    projectId: "how-to-play-17b44",
    storageBucket: "how-to-play-17b44.appspot.com",
    messagingSenderId: "598662324729",
    appId: "1:598662324729:web:9434356f5944e12ec65d28",
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = firebaseApp.firestore();
export default db;
