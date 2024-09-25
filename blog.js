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
 

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');

    if (loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserName').innerText=userData.name;
                document.getElementById('loggedUserEmail').innerText=userData.email;
            
            }
            else{
                localStorage.removeItem('loggedInUserId');
                signOut(auth)
                .then(()=>{
                    window.location.href='accountredirectmanager.html'
                })
                .catch((error)=>{
                    console.error('Error signing out:', error)
                })
                window.location.href="accountredirectmanager.html"
                console.log("no document matching found id")
            }
        })
        .catch((error)=>{
            localStorage.removeItem('loggedInUserId');
            signOut(auth)
            .then(()=>{
                window.location.href='accountredirectmanager.html'
            })
            .catch((error)=>{
                console.error('Error signing out:', error)
            })
            window.location.href="accountredirectmanager.html"
            console.log("Error getting document")
        })
    }
    else{
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
        .then(()=>{
            window.location.href='accountredirectmanager.html'
        })
        .catch((error)=>{
            console.error('Error signing out:', error)
        })
        window.location.href="accountredirectmanager.html"
        console.log("UserId not found in local storage")
    }
  })