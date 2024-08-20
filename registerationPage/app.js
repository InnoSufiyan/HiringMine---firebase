import { auth, createUserWithEmailAndPassword, db, doc, setDoc, registerFirebase } from "../utils/firebase.js";

document.querySelector('#submitBtn').addEventListener('click', async (e) => {

    e.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const userName = document.querySelector('#userName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    console.log(firstName, lastName, userName, email, password, confirmPassword);

    try {
        const uid = await registerFirebase(auth, email, password)

        console.log("User registered with UID: ", uid);

        // Add a new document in collection "users" with UID as document ID
        await setDoc(doc(db, "users", uid), {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            isAdmin: false,
        });

        // Redirect to login page
        window.location.href = "../loginPage/index.html";

    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
})
