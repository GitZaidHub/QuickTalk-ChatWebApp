// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "blog-app-9ad1a.firebaseapp.com",
  projectId: "blog-app-9ad1a",
  storageBucket: "blog-app-9ad1a.appspot.com",
  messagingSenderId: "1042218066031",
  appId: "1:1042218066031:web:96bb59f85e55c56d33ad9a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();