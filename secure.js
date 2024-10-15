
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-aLANF3Waui3Df0mpOK55XqhuKGZu_Dc",
    authDomain: "stayhealthyuserdatabase.firebaseapp.com",
    projectId: "stayhealthyuserdatabase",
    storageBucket: "stayhealthyuserdatabase.appspot.com",
    messagingSenderId: "660807547495",
    appId: "1:660807547495:web:f92cdd3b8e9e0d9160f2c2",
    measurementId: "G-7KS7Z5X9HT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

  const auth=getAuth();
  const db=getFirestore();


if(localStorage.getItem('loggedInUserId')){
    console.log('Found user. Accepted.')
}else{
    window.location.href = 'member.html'
}
