import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
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
    const uid = user.uid;


    if (loggedInUserId){
        console.log('UserId found in the local storage. Connectiong to server.');

        if (localStorage.getItem('loggedInUserId')===uid){
            
        }else{
            console.log('Strange ID');
            setTimeout(() => {
                console.log('HACKER ATTACK! EMERGENCY');
                setTimeout(() => {
                    console.log('Emergency ending session.');
                    setTimeout(() => {
                        console.log('Connecting to Server...');
                        setTimeout(() => {
                            console.log('Ending session...');
                            setTimeout(() => {
                                console.log('Clearing user data...');
                                setTimeout(() => {
                                    
                                    localStorage.setItem('error', '003');
                                    localStorage.removeItem('loggedInUserId');
                            localStorage.setItem('welcomeMessage', 'Willkommen zurück. Auf diesem Gerät wurde eine versuchte Hackerattacke auf die Webseite erkannt. Wir haben die Bedrohung behoben.');
                            auth.signOut();
                            setTimeout(() => {
                        console.log('Session blocked.');
                        setTimeout(() => {
                            console.log('Redirecting...');
                            setTimeout(() => {
                                window.location.href = 'accountredirectmanager.html';
                                        }, 50);
                                    }, 50);
                                }, 50);
                                    }, 50);
                                }, 50);
                            }, 50);
                        }, 50);

                    }, 100);
            },100);
        }
        
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                const userPermShips=userData.permShips;
                console.log(userPermShips)
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

var haspermship = 0
            
            console.warn('Fething permantent memberships!')
            console.log('User is in:')

            //one element for permship

                if(userPermShips.includes('weih24')){
        	    console.log('*Weih24')
                haspermship = 1
                }else{
                    const membership1 = document.getElementsByClassName('weih24');
                    while(membership1.length > 0){
                        membership1[0].parentNode.removeChild(membership1[0]);
                    }
                }

            //element ends here

            //other elements
            if(userPermShips.includes('weih25')){
        	    console.log('*weih25')
                haspermship = 1
                }else{
                    const membership2 = document.getElementsByClassName('weih25');
                    while(membership2.length > 0){
                        membership2[0].parentNode.removeChild(membership2[0]);
                    }
                }

            //end
            console.log('has perm ship1')
            if(haspermship=="1"){
                console.log('has perm ship')
                const preview10 = document.getElementsByClassName('articlePreview');
                while(preview10.length > 0){
                    preview10[0].parentNode.removeChild(preview10[0]);
                }
            }else{
            }

                
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

if (localStorage.getItem('welcomeMessage')){
    alert(localStorage.getItem('welcomeMessage'));
    localStorage.removeItem('welcomeMessage');
}

const auth1=getAuth();

document.getElementById('accountSettingsButton').addEventListener('click', function () {
   window.location.href='member-settings.html';
});

