import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

// Check authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const userId = user.uid; // Get user ID from Firebase Auth
        const storedUserId = localStorage.getItem("loggedInUserId"); // Retrieve loggedInUserId from local storage

        // Check if user IDs match
        if (userId === storedUserId) {
            // Fetch user document from Firestore under 'users/userId'
            const userDocRef = doc(db, "users", userId); // Ensure this path matches your Firestore structure
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const adminStatus = userData.admin !== undefined ? userData.admin : 0; // Default to 0 if admin is undefined

                // Check if the user is an admin
                if (adminStatus < 1) {
                    // Redirect to member.html if not an admin
                    window.location.href = "member.html";
                } else {
                    // User is an admin; proceed with your application logic
                    console.log("User is an admin.");
                    // Add further logic for admin users here if needed
                }
            } else {
                console.log("No such document!"); // Document does not exist
                window.location.href = "member.html"; // Redirect if user document doesn't exist
            }
        } else {
            console.log("User ID mismatch. Please log in again.");
            window.location.href = "member.html"; // Redirect on ID mismatch
        }
    } else {
        console.log("No user is signed in.");
        // Redirect to login or member.html if not signed in
        window.location.href = "member.html"; // Change this if you want a different landing page
    }
});
