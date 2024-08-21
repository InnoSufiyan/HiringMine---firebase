import { auth, onAuthStateChanged, saveDataInFirebase } from "../utils/firebase.js";

let userId;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        console.log(uid, "==>> uid")
        userId = uid
        // ...
    } else {
        // User is signed out
        // ...
        window.location.href = "../index.html"
    }
});

document.querySelector('#submitBtn').addEventListener('click', async (e) => {
    e.preventDefault()
    console.log("==>> job submit horahi hai")

    const designation = document.querySelector('#designation').value
    const description = document.querySelector('#description').value
    const city = document.querySelector('#city').value
    const country = document.querySelector('#country').value
    const salary = document.querySelector('#salary').value
    const experience = document.querySelector('#experience').value
    const skills = document.querySelector('#skills').value
    const emailToApply = document.querySelector('#emailToApply').value

    console.log(designation, description, city, country, salary, experience, skills, emailToApply)

    // mera khud ka ek function ho
    // jis ko main collection ka naam btaoun // users // categories // job post // product
    // us k ander uid btaoun
    // us ko woh data dun jo save karwana hai    {firstName, lastName} {categoryName, categoryDesc}
    const date = new Date()
    const createAJob = await saveDataInFirebase('jobAds', date.getTime(), {
        designation,
        description,
        city,
        country,
        salary,
        experience,
        skills,
        emailToApply,
        createdBy: userId
    })
})