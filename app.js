import { auth, onAuthStateChanged, signOut, getMultipleDataFromFirebase, doc } from "./utils/firebase.js";

const logoutBtn = document.querySelector('#logoutBtn')
const loginBtn = document.querySelector('#loginBtn')
const joinNowBtn = document.querySelector('#joinNowBtn')

//banda sign in hai ya nahin

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        console.log(uid, "==>> uid")

        console.log(loginBtn, "==>> loginBtn")
        console.log(joinNowBtn, "==>> joinNowBtn")

        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        joinNowBtn.style.display = "none";
        // ...
    } else {
        // User is signed out
        // ...
        loginBtn.style.display = "block";
        joinNowBtn.style.display = "block";
    }
});

//logout karna

logoutBtn.addEventListener('click', async () => {
    await signOut(auth)
    console.log("User signed out")
    logoutBtn.style.display = "none";
})

// database sey categories fetch karna

const fetchCategoriesFromFirebase = async () => {

    const getCategoriesFromFirebase = await getMultipleDataFromFirebase('categories')

    getCategoriesFromFirebase.forEach((category) => {
        document.querySelector('#categoriesUL').innerHTML += `<li>${category.categoryName}</li>`
    })

}

const fetchJobsFromFirebase = async () => {

    const getJobAdsFromFirebase = await getMultipleDataFromFirebase('jobAds')

    getJobAdsFromFirebase.forEach((job) => {
        console.log(job, "==>> job")
    })
}

fetchCategoriesFromFirebase()
fetchJobsFromFirebase()