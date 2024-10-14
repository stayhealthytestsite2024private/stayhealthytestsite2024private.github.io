// Import the functions you need from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-aLANF3Waui3Df0mpOK55XqhuKGZu_Dc",
    authDomain: "stayhealthyuserdatabase.firebaseapp.com",
    projectId: "stayhealthyuserdatabase",
    storageBucket: "stayhealthyuserdatabase.appspot.com",
    messagingSenderId: "660807547495",
    appId: "1:660807547495:web:f92cdd3b8e9e0d9160f2c2",
    measurementId: "G-7KS7Z5X9HT"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Function to check Firestore status in real-time
function checkStatus() {
    console.log('Starte Überprüfung des Firestore-Status...');

    // Reference the document in Firestore
    const docRef = doc(db, 'data/status'); // Correct path

    // Listen to real-time updates
    onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const status = docSnapshot.data().memberstatus; // Retrieve 'memberstatus' field as boolean
            console.log(`Aktueller Status aus Firestore: ${status}`);

            const currentPage = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
            console.log(`Aktuelle Seite: ${currentPage}`);

            // Log the redirect condition
            console.log(`Redirecting logic: memberstatus=${status}, currentPage=${currentPage}`);

            // Check for redirect conditions based on boolean status
            if (status === false) {
                if (currentPage === '/member-status-closed.html') {
                } else {
                    console.log('Status is false, redirecting to member-status-closed.html');
                    window.location.href = 'member-status-closed.html';
                }
            } else if (status === true) {
                if (currentPage === '/member-status-closed.html') {
                    console.log('Status is true and on member-status-closed.html, redirecting to member.html');
                    window.location.href = 'member.html';
                } else {
                    console.log('Status is true but not on member-status-closed.html, no redirection.');
                }
            } else {
                console.log('Unbekannter Status.');
            }
        } else {
            console.log('Dokument nicht gefunden!');
        }
    }, (error) => {
        console.error('Fehler beim Abrufen des Dokuments:', error);
    });
}

// Start the status check immediately
checkStatus();
// Uncomment the following line to run every 10 seconds
setInterval(checkStatus, 10000); // 10000 milliseconds = 10 seconds
