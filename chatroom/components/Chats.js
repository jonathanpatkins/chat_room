import React, { useState, Component, useRef } from "react";

import Button from "react-bootstrap/Button";

import { firestore, auth } from "../utils/firebase";
import firebase from "firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

export const ListOfChats = () => {
  const roomsRef = firestore.collection("numberOfRooms");
  const query = roomsRef.orderBy("createdAt");
  const [chatroom, setChatroom] = useState(null);

  const [rooms] = useCollectionData(query, { idField: "id" });

  return (
    <React.Fragment>
      {chatroom ? (
        <ChatRoom roomNumber={chatroom} />
      ) : (
        <PickChat rooms={rooms} setChatroom={setChatroom} roomsRef={roomsRef} />
      )}
    </React.Fragment>
  );
};

export const PickChat = ({ rooms, setChatroom, roomsRef }) => {
  const [formValue, setFormValue] = useState("");

  const newRoom = async (e) => {
    // 1. add a new chat to firebase
    // 2. set us to the new room
    e.preventDefault();
    await roomsRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");

    setChatroom(formValue);
  };
  return (
    <React.Fragment>
      {rooms &&
        rooms.map((room) => {
          console.log(room.text);
          return (
            <Button
              variant="info"
              onClick={() => {
                setChatroom(room.text);
              }}
            >
              {room.text}
            </Button>
          );
        })}
      <form onSubmit={newRoom}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter chat room name"
        />

        <button type="submit" disabled={!formValue}>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
};

export const ChatRoom = ({ roomNumber }) => {
  const dummy = useRef();
  const messagesRef = firestore.collection(`messages${roomNumber}`);
  const query = messagesRef.orderBy("createdAt");

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
      <div>
        <h3>{roomNumber}</h3>
      </div>
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
