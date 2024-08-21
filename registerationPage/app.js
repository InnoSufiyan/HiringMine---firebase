import { auth, createUserWithEmailAndPassword, db, doc, setDoc, registerFirebase, saveDataInFirebase } from "../utils/firebase.js";

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

        // mera khud ka ek function ho
        // jis ko main collection ka naam btaoun // users // categories // job post // product
        // us k ander uid btaoun
        // us ko woh data dun jo save karwana hai    {firstName, lastName} {categoryName, categoryDesc}

        const savingUser = await saveDataInFirebase('users', uid, {
            firstName,
            lastName,
            userName,
            email,
            isAdmin: false
        })

        // Redirect to login page
        window.location.href = "../loginPage/index.html";

    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
})
