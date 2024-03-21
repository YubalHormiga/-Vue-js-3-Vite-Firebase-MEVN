import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCUhQAnIvsPRWY5X-pHplF_PE3yYu1rhwk",
  authDomain: "vue-blueweb.firebaseapp.com",
  projectId: "vue-blueweb",
  storageBucket: "vue-blueweb.appspot.com",
  messagingSenderId: "66481925269",
  appId: "1:66481925269:web:ac258760288806d751bf9c",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
export { auth, db };
