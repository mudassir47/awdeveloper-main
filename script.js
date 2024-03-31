import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { getDatabase, ref, push, onChildAdded ,set} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrwoTubJRWXqH4so2rHMUOB7uEQs8L_Gw",
    authDomain: "awdeveloper-f2b8a.firebaseapp.com",
    databaseURL: "https://awdeveloper-f2b8a-default-rtdb.firebaseio.com",
    projectId: "awdeveloper-f2b8a",
    storageBucket: "awdeveloper-f2b8a.appspot.com",
    messagingSenderId: "282175704205",
    appId: "1:282175704205:web:a8f9d7d0e62b4fff0726c4",
    measurementId: "G-DEC9K1X09R"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);




// Function to store user data in Firebase
function storeUserData(email, uid, loginDate) {
    const userDataRef = ref(db, 'users/' + uid);
    set(userDataRef, {
        email: email,
        uid: uid, 
        loginDate: loginDate
    });
}

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is authenticated
        const email = user.email;
        const uid = user.uid;
        const loginDate = new Date().toString();

        // Store user data in Firebase
        storeUserData(email, uid, loginDate);

        if (window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    } else {
        // User is not authenticated
        if (window.location.pathname !== '/google-login.html') {
            window.location.href = 'google-login.html';
        }
    }
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        document.getElementById("mkemail").textContent = email;
        console.log("User email:", email);
        // You can use the email here as needed
        
    } else {
        console.log("User not logged in");
    }
});
// Function to handle Google Sign-In
function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Handle successful sign-in
            const user = result.user;
            console.log("User signed in:", user);
            // Redirect to index.html after successful sign-in
            
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
        });
}

// Add click event listener to the "Sign in with Google" button
document.getElementById('signInWithGoogleButton').addEventListener('click', () => {
    signInWithGoogle();
});
function registerWithEmailPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const uid = user.uid;
            const loginDate = new Date().toString();

            // Store user data in Firebase
            storeUserData(email, uid, loginDate);

            // Redirect to index.html after successful registration
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
        });
}
document.getElementById('mregister').addEventListener('click', () => {
    const email = document.getElementById('memail').value;
    const password = document.getElementById('mpassword').value;

    // Register with email and password
    registerWithEmailPassword(email, password);
});

////   sing in with google above code////

const database = getDatabase(firebaseApp);
 
const chatRef = ref(database, 'chat');

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        push(chatRef, {
            message: message
        });

        messageInput.value = '';
    }
}

// Function to display chat messages
onChildAdded(chatRef, (snapshot) => {
    const message = snapshot.val().message;
    displayMessage(message);
});

// Function to display a message in the chat list
function displayMessage(message) {
    const chatList = document.getElementById('chatList');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatList.appendChild(messageDiv);
}

///// chat  code above ///