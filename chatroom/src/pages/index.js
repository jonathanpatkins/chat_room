// scope css locally
import React from "react";
import Layout from "../components/Layout";
import HelmetWrapper from "../components/HelmetWrapper";

import { firestore, auth } from "../utils/firebase";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import styled from "styled-components";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout>
      <HelmetWrapper title="Index" description="This is the index" />

      <h1>Here will be the holding page for the app</h1>
      <section>{user ? <ListOfChats /> : <SignIn />}</section>
    </Layout>
  );
}

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines</p>
    </>
  );
};

const ListOfChats = () => {
  const messagesRef = firestore.collection("numberOfRooms");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  console.log(messagesRef);
  return (
    <React.Fragment>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
    </React.Fragment>
  );
};

const ChatMessage = ({ message }) => {
  const { text } = message;
  console.log(text.roomNumber);

  return (
    <>
      <div>
        <p>{text.roomNumber}</p>
      </div>
    </>
  );
};
