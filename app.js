import { auth, onAuthStateChanged, signOut } from "./utils/firebase.js";

const logoutBtn = document.querySelector('#logoutBtn')

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        console.log(uid, "==>> uid")

        logoutBtn.style.display = "block";
        // ...
    } else {
        // User is signed out
        // ...
    }
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth)
    console.log("User signed out")
    logoutBtn.style.display = "none";
})