import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

localStorage.removeItem('finishedLoading');

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
                if (userData.vip === 1){
                    const articles22 = document.getElementsByClassName('articlePlus');
                    while(articles22.length > 0){
                        articles22[0].parentNode.removeChild(articles22[0]);
                    }
                    const preview2 = document.getElementsByClassName('articlePreview');
                    while(preview2.length > 0){
                        preview2[0].parentNode.removeChild(preview2[0]);
                    }
                    const purchase1 = document.getElementsByClassName('promtpurchase');
                    while(purchase1.length > 0){
                        purchase1[0].parentNode.removeChild(purchase1[0]);
                    }
                   
                    document.getElementById('vip-specific-title').innerText='Die neusten Nachrichten:'

                };

                if(userData.vip === 2){
                    document.getElementById('vip-specific-title').innerText='Die neusten Nachrichten:';
                    const preview1 = document.getElementsByClassName('articlePreview');
                    while(preview1.length > 0){
                        preview1[0].parentNode.removeChild(preview1[0]);
                    }
                    const purchase2 = document.getElementsByClassName('promtpurchase');
                    while(purchase2.length > 0){
                        purchase2[0].parentNode.removeChild(purchase2[0]);
                    }
                };

                if (userData.vip===0){
                    const articles21 = document.getElementsByClassName('articlePlus');
                    while(articles21.length > 0){
                        articles21[0].parentNode.removeChild(articles21[0]);
                    }


                    const elements = document.getElementsByClassName('article');
                    while(elements.length > 0){
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                    document.getElementById('vip-specific-title').innerText='Dieser Account hat kein laufendes Abonnement.'
                };
                
                
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

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='accountredirectmanager.html'
    })
    .catch((error)=>{
        console.error('Error signing out:', error)
    })
  })
  
  if (window.matchMedia("(min-width: 500px)").matches) {
    
  } else {
      const elements1 = document.getElementsByClassName('image');
      while(elements1.length > 0){
          elements1[0].parentNode.removeChild(elements1[0]);
      }
}

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 500px)").matches) {
    
    } else {
        const elements1 = document.getElementsByClassName('image');
        while(elements1.length > 0){
            elements1[0].parentNode.removeChild(elements1[0]);
        }
  }})

const deleteButton=document.getElementById('delete');

//Error Erkennung

if (localStorage.getItem('loggedInUserId')=="" || localStorage.getItem('loggedInUserId')=="0" || localStorage.getItem('loggedInUserId')=="undefined"){
    localStorage.setItem('error', '001');
}
//if (localStorage.getItem('loggedInUserId') && document.getElementById('loggedUserEmail').innerText === "N/A" && localStorage.getItem('finishedLoading')){
//   if (localStorage.getItem('error')){
//
//    }else{
//    localStorage.setItem('error', '002');
//    window.location.href = 'member.html'
//    }
//}
if (localStorage.getItem('loggedInUserId') && document.getElementById('loggedUserName').innerText === "Lädt.." && localStorage.getItem('finishedLoading')){
    if (localStorage.getItem('retryError002')){
        var attempt = parseInt(localStorage.getItem('retryError002'));
        if (attempt >= "10"){
            localStorage.setItem('error', '002');
            localStorage.removeItem('retryError002');
        }else{
            attempt += 1
            localStorage.setItem('retryError002', attempt);
            window.location.href = 'member.html';
        }

    }else{
        localStorage.setItem('retryError002', '1');
        window.location.href = 'member.html';
    }
}

//Error Noftication

if (localStorage.getItem('error') === "001"){
    alert('Ein kritischer Softwarefehler ist aufgetreten. Wir werden versuchen, das Problem Automatisch zu beheben. Bitte nach dem OK Klicken einen Moment warten.');
    setTimeout(() => {
alert('Das Problem sollte behoben sein. Wir werden Sie nun abmelden. Danke für Ihre Gedult. Falls Sie Fragen haben: Fehlercode 001')
localStorage.removeItem('loggedInUserId');
if (localStorage.getItem('emailvis')){
    localStorage.removeItem('emailvis');
}
if (localStorage.getItem('instaLoad')){
    localStorage.removeItem('instaLoad');}
    if (localStorage.getItem('error')){
        localStorage.removeItem('error');}

auth.signOut();
window.location.href = 'member.html';
    }, 5000);
}

if (localStorage.getItem('error') === "002"){
    alert('Ein kritischer Softwarefehler ist aufgetreten. Wir werden versuchen, das Problem Automatisch zu beheben. Bitte nach dem OK Klicken einen Moment warten.');
    setTimeout(() => {
alert('Das Problem sollte behoben sein. Wir werden Sie nun abmelden. Danke für Ihre Gedult. Falls Sie Fragen haben: Fehlercode 002')
localStorage.removeItem('loggedInUserId');
if (localStorage.getItem('emailvis')){
    localStorage.removeItem('emailvis');
}
if (localStorage.getItem('instaLoad')){
    localStorage.removeItem('instaLoad');}
    if (localStorage.getItem('error')){
        localStorage.removeItem('error');}

auth.signOut();
window.location.href = 'member.html';
    }, 5000);
}




