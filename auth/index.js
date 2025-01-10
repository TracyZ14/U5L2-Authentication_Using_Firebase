/* === Imports === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyDg3HqIFB2p4bG68RQ2VfMPE5S0UQy8f8A",
    authDomain: "hot-and-cold-e05df.firebaseapp.com",
    projectId: "hot-and-cold-e05df",
    storageBucket: "hot-and-cold-e05df.firebasestorage.app",
    messagingSenderId: "938805171289",
    appId: "1:938805171289:web:ede2f85683c5f616e98d48"
};
const app = initializeApp(firebaseConfig);

console.log("projectId: " + app.options.projectId);

const auth = getAuth(app)

console.log(auth)

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const userGreetingEl = document.getElementById("user-greeting")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

showLoggedOutView()

/*  Challenge:
    Import the onAuthStateChanged function from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
    Use the code from the documentation to make this work.
    Use onAuthStateChanged to:
    Show the logged in view when the user is logged in using showLoggedInView()
    Show the logged out view when the user is logged out using showLoggedOutView()
*/

onAuthStateChanged(auth, (user) => {
    if(user) {
        showLoggedInView()

        showProfilePicture(userProfilePictureEl, user)

        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
})

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
   
    /*  Challenge:
        1 Import the signInWithEmailAndPassword function from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
        2 Use the code from the documentation to make this function work.
        3 Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
        4 If the login is successful then you should show the logged in view using showLoggedInView()
        5 If something went wrong, then you should log the error message using console.error.
    */

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
   
    /*  Challenge:
        1 Import the createUserWithEmailAndPassword function from from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
        2 Use the code from the documentation to make this function work.
        3 Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
        4 If the creation of user is successful then you should show the logged in view using showLoggedInView()
        5 If something went wrong, then you should log the error message using console.error.
    */

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authSignOut() {
    /*  Challenge:
        Import the signOut function from 'firebase/auth'

        Use the code from the documentation to make this function work.

        If the log out is successful then you should show the logged out view using showLoggedOutView()
        If something went wrong, then you should log the error message using console.error.
    */
   
    signOut(auth)
    .then(() => {
        showLoggedOutView()
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function showProfilePicture(imgElement, user) {
    /*  Challenge:
        Use the documentation to make this function work.
       
        This function has two parameters: imgElement and user
       
        We will call this function inside of onAuthStateChanged when the user is logged in.
       
        The function will be called with the following arguments:
        showProfilePicture(userProfilePictureEl, user)
       
        If the user has a profile picture URL, set the src of imgElement to that URL.
       
        Otherwise, you should set the src of imgElement to "assets/images/default-profile-picture.jpeg"
    */

    if(user.photoURL) {
        imgElement.src = user.photoURL
    } else {
        imgElement.src = "assets/images/defaultPic.jpg"
    }
}

function showUserGreeting(element, user) {
    /*  Challenge:
        Use the documentation to make this function work.
       
        This function has two parameters: element and user
       
        We will call this function inside of onAuthStateChanged when the user is logged in.
       
        The function will be called with the following arguments:
        showUserGreeting(userGreetingEl, user)
       
        If the user has a display name, then set the textContent of element to:
        "Hi ___ ( your first name)"
        Where __ is replaced with the actual first name of the user
       
        Otherwise, set the textContent of element to:
        "Hey friend, how are you?"
    */

    if(user.displayName) {
        element.textContent = "Hi " + user.displayName
    } else {
        element.textContent = "Hey friend, how are you?"
    }
 } 

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

//credit: coursera