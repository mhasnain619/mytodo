// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAsSnCVT2lrScpWBl262WU_y2WQJYFzqoM",
    authDomain: "todo-app-50353.firebaseapp.com",
    projectId: "todo-app-50353",
    storageBucket: "todo-app-50353.firebasestorage.app",
    messagingSenderId: "258880830830",
    appId: "1:258880830830:web:4b8212dd2d4e7fcefdd57f",
    measurementId: "G-4ERZ86WYPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db