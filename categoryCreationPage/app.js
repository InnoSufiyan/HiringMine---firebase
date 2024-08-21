import { auth, onAuthStateChanged, doc, getDoc, db, saveDataInFirebase } from "../utils/firebase.js";

let userDetails;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        console.log(uid, "==>> uid")

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            userDetails = docSnap.data()

            userDetails.uid = uid

            const { isAdmin } = docSnap.data();

            console.log(isAdmin, "=>>> isAdmin")

            if (isAdmin) {
                console.log("Admin is logged in")
            } else {
                console.log("A Normal User is logged in")
                window.location.href = "../index.html"
            }
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        // ...
    } else {
        // User is signed out
        // ...
        window.location.href = "../index.html"
    }
});



document.querySelector('#submitBtn').addEventListener('click', async (e) => {
    e.preventDefault()
    console.log("==>> category submit horahi hai")
    const categoryName = document.querySelector('#categoryName').value
    const categoryDescription = document.querySelector('#categoryDescription').value

    console.log(categoryName, categoryDescription, userDetails.uid)

    // mera khud ka ek function ho
    // jis ko main collection ka naam btaoun // users // categories // job post // product
    // us k ander uid btaoun
    // us ko woh data dun jo save karwana hai    {firstName, lastName} {categoryName, categoryDesc}
    const date = new Date()

    // return

    try {
        const savingCategory = await saveDataInFirebase('categories', date.getTime(), {
            categoryName: categoryName,
            categoryDescription: categoryDescription,
            createdBy: userDetails.uid,
        })
    } catch (error) {
        console.log(error, "==>> error")
    }


})