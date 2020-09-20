import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBTF7qLv8grqjAGQl2vM_MC4KJB7_0D_R8",
    authDomain: "crack-inventory.firebaseapp.com",
    databaseURL: "https://crack-inventory.firebaseio.com",
    projectId: "crack-inventory",
    storageBucket: "crack-inventory.appspot.com",
    messagingSenderId: "1029404235748",
    appId: "1:1029404235748:web:d6888e66598dfb108d99f1",
    measurementId: "G-4QLYL9RY2P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {firebase as default, firestore, auth, storage, provider};