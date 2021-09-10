import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import Dropdown from "react-bootstrap/Dropdown";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function App() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState("Home");

  return (
    <div className="App">
      <header>
        <SignOut />
        <ChatRoomsList func={setRoom} />
      </header>

      <section>
        {user ? <ChatRoom roomNumber={room} func={setRoom} /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

const ChatRoomsList = ({ func }) => {
  const roomsRef = firestore.collection("numberOfRooms");
  const query = roomsRef.orderBy("createdAt");

  const [rooms] = useCollectionData(query, { idField: "id" });

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => {
            const { text } = room;
            const ref = `#/${text.roomNumber}`;
            console.log(ref);
            return <Dropdown.Item href={ref}>{text.roomNumber}</Dropdown.Item>;
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChatRoom = ({ roomNumber = "Home", func }) => {
  const dummy = useRef();
  const messagesRef = firestore.collection(`messages${roomNumber}`);
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  // console.log(messages);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          >
        </button>
      </form>
    </>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
