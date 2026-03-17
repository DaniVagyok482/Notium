import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    // IDE MÁSOLD A SAJÁT ADATAIDAT!
    apiKey: "AIzaSyC7zyJJltzeahEW21UJZIpci-2SrTdW3M0",
    authDomain: "notium-d4ba4.firebaseapp.com",
    projectId: "notium-d4ba4",
    storageBucket: "notium-d4ba4.firebasestorage.app",
    messagingSenderId: "142321037184",
    appId: "1:142321037184:web:f63931338f8784537c5b65"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);