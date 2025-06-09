

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDPRglM30HN1bQCB35rf-9N14ZhvXpWEY",
    authDomain: "musicrhythms.firebaseapp.com",
    projectId: "musicrhythms",
    storageBucket: "musicrhythms.firebasestorage.app",
    messagingSenderId: "155975394093",
    appId: "1:155975394093:web:ab9f60684012f0f8ebe9a4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp)
export let __DB = getFirestore(firebaseApp)