
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuNnrQkeQolkRCvD5Punj61a74eyfVQW4",
    authDomain: "jobportal-f1697.firebaseapp.com",
    projectId: "jobportal-f1697",
    storageBucket: "jobportal-f1697.appspot.com",
    messagingSenderId: "264192335921",
    appId: "1:264192335921:web:a9d3f929346d6663afb510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const loginFirebase = async (auth, email, password) => {
    const { user: { uid } } = await signInWithEmailAndPassword(auth, email, password)

    return uid
}

const registerFirebase = async (auth, email, password) => {
    const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)

    return uid
}



export { auth, db, createUserWithEmailAndPassword, doc, setDoc, signInWithEmailAndPassword, onAuthStateChanged, signOut, loginFirebase, registerFirebase };