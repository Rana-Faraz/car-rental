// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_yTFw9FOjl8aIeBddxqn28Qkbpl6LcY8",
  authDomain: "car-rental-818f1.firebaseapp.com",
  projectId: "car-rental-818f1",
  storageBucket: "car-rental-818f1.appspot.com",
  messagingSenderId: "368383603707",
  appId: "1:368383603707:web:026b9edb72df26e658115e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
