import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAIt4jWIhSztAxDNMaZSercC2aQBLND3ao",
  authDomain: "d3-learning-4ba95.firebaseapp.com",
  projectId: "d3-learning-4ba95",
  storageBucket: "d3-learning-4ba95.appspot.com",
  messagingSenderId: "237409928045",
  appId: "1:237409928045:web:4426cc8e95d7fd3c5fd064",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;