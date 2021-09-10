import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB47ZMyV6oUbh-n68_y734G8t47tUYPt7E",
  authDomain: "chat-6bb8e.firebaseapp.com",
  projectId: "chat-6bb8e",
};

// if (!firebase.apps.length) {
const firebaseApp = initializeApp(firebaseConfig);
// }

const firestore = getFirestore();
const auth = getAuth(firebaseApp);

export { firestore, auth };
