import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyB47ZMyV6oUbh-n68_y734G8t47tUYPt7E",
  authDomain: "chat-6bb8e.firebaseapp.com",
  projectId: "chat-6bb8e",
  storageBucket: "chat-6bb8e.appspot.com",
  messagingSenderId: "126139751842",
  appId: "1:126139751842:web:3b41838513eb454fd866fb",
  measurementId: "G-X2KQ90S3B2",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firestore, auth };
