import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-SWbjGV5LEJyW4VwEdbedkzwCNNxfsJ0",
  authDomain: "boipoka-b8011.firebaseapp.com",
  projectId: "boipoka-b8011",
  storageBucket: "boipoka-b8011.firebasestorage.app",
  messagingSenderId: "945257379509",
  appId: "1:945257379509:web:2988f76c178af066d770fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
