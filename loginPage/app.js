import { auth, signInWithEmailAndPassword, loginFirebase } from "../utils/firebase.js";


document.querySelector('#submitBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;


    try {
        const uid = await loginFirebase(auth, email, password) //uid

        console.log(uid, "==>> uid");

        window.location.href = "../index.html";
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
})