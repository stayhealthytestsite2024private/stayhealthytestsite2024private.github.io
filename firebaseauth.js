
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
 import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId)
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    },5000
);
  }

  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
  showMessage('Einen Moment bitte.', 'signUpMessage')
event.preventDefault();
const email=document.getElementById('remail').value;
const password=document.getElementById('rpassword').value;
const name=document.getElementById('rname').value;
const vip=0

const auth=getAuth()
const db=getFirestore();

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential)=>{
const user=userCredential.user;
const userData={
    email: email,
    name: name,
    vip: vip
};
showMessage('Erfolgreich registriert!', 'signUpMessage')
const docRef=doc(db, "users", user.uid);
setDoc(docRef, userData)
.then(()=>{
    window.location.href='accountredirectmanager.html';
})
.catch((error)=>{
  showMessage(error.code, 'signUpMessage')
});
})

.catch(error=>{
  if (error.code === "auth/email-already-in-use"){
    showMessage('Email bereits registriert.', 'signUpMessage')
  }else{
    showMessage(error.code, 'signUpMessage')
  }
  if (error.code === "auth/invalid-email"){
    showMessage('Bitte eine echte Email eingeben', 'signUpMessage')
  }
  if (error.code === "auth/missing-password"){
    showMessage('Bitte ein Passwort festlegen.', 'signUpMessage')
  }

});
  })

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
  showMessage('Einen Moment bitte.', 'signInMessage')
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('Login erfolgreich', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='member.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorcode==='auth/invalid-credential'){
            showMessage('Email oder Passwort inkorrekt.', 'signInMessage')
        }
        else{
            showMessage('Account existiert nicht.', 'signInMessage')
        }
    })
})

if(localStorage.getItem('loggedInUserId')){
  let result = confirm("Bereits angemeldet! Einloggen?");
      
  if (result) {
    window.location.href='member.html';  
  } else {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
      localStorage.setItem('loggedOutMessage', true)
      window.location.href='accountredirectmanager.html'
    })
    .catch((error)=>{
        console.error('Error signing out:', error)
        showMessage('Schwerer Fehler bei der Abmeldung.', 'signInMessage')
  showMessage('Schwerer Fehler bei der Abmeldung.', 'signUpMessage')
    })
  }
}

if(localStorage.getItem('error')){
  var errorcode = localStorage.getItem('error');
  if (errorcode === "003"){
    alert('Die Sitzung wurde Notdürftig beendet. Begründung: Verdacht auf eine Hackerattacke.');
    localStorage.removeItem('error');
  }else{
    alert('Unbekannter Fehler.');
    localStorage.removeItem('error');
  }
}
