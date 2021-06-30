import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


firebase.initializeApp({
  // your config
  apiKey: "AIzaSyB47ZMyV6oUbh-n68_y734G8t47tUYPt7E",
    authDomain: "chat-6bb8e.firebaseapp.com",
    projectId: "chat-6bb8e",
    storageBucket: "chat-6bb8e.appspot.com",
    messagingSenderId: "126139751842",
    appId: "1:126139751842:web:3b41838513eb454fd866fb",
    measurementId: "G-X2KQ90S3B2"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>
        {user ? <HoldingPage /> : <SignIn />}
      </section>

    </div>
  );
}

function HoldingPage() {
  return (
    <React.Fragment>
      <Router>
        <h1>
          This is the holding page
        </h1>
      <div>
        <ul>
          <li>
            <Link to="/Room1">Room #1</Link>
          </li>
          <li>
            <Link to="/Room2">Room #2</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <HoldingPage />
          </Route>
          <Route path="/Room1">
            <Room1 />
          </Route>
          <Route path="/Room2">
            <Room2 />
          </Route>
        </Switch>
      </div>
    </Router>
    </React.Fragment>
  )
}


function ChooseRoom() {
  return (
    <>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/Room1">Room #1</Link>
            </li>
            <li>
              <Link to="/Room2">Room #2</Link>
            </li>
          </ul>
        </div>
      </Router>
    </>
  )
}

function Room1() {
  return (
    <ChatRoom roomNumber="1"/>
  )
}

function Room2() {
  return (
    <ChatRoom roomNumber="2"/>
  )
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom(props) {
  const dummy = useRef();

  // This is how something gets put into the database
  const messagesRef = firestore.collection(`messages${props.roomNumber}`);
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>
      {/* This is where we render what was in the database */}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>></button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;

