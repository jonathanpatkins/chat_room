import Head from "next/head";
import Image from "next/image";
import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import Layout from "../components/Layout";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout title={"Hello World"}>
      <h1>Here will be the holding page for the app</h1>
      <section>{user ? <ListOfChats /> : <SignIn />}</section>
    </Layout>
  );
}

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines</p>
    </>
  );
};

const ListOfChats = () => {
  // const roomsRef = getDocs(collection(firestore, "numberOfRooms")).then(
  //   (result) =>
  //     result.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     })
  // );
  let res = [];
  getDocs(
    query(
      collection(firestore, "numberOfRooms"),
      orderBy("createdAt", "desc"),
      limit(10)
    )
  ).then((result) => (res = result));
  console.log(res);

  return (
    <React.Fragment>
      {res.map((doc, idx) => {
        const data = doc.data();
        return (
          <div>
            <h3>
              {idx}: {doc.text.roomNumber}
            </h3>
          </div>
        );
      })}
    </React.Fragment>
  );
};
