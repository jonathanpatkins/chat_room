import React, { useState, Component, useRef } from "react";

import Button from "react-bootstrap/Button";

import { firestore, auth } from "../utils/firebase";
import firebase from "firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

import styled from "styled-components";

import { theme } from "../styles/theme";

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
            <RoomContainer
              onClick={() => {
                setChatroom(room.text);
              }}
            >
              {room.text}
            </RoomContainer>
          );
        })}
      <h5 style={{ margin: "1rem 0 .5rem 0" }}>Add a new chat</h5>
      <MyForm onSubmit={newRoom}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter chat room name"
        />

        <button type="submit" disabled={!formValue}>
          Submit
        </button>
      </MyForm>
    </React.Fragment>
  );
};

export const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <MessageContainer>
        <div className={messageClass}>
          <img src={photoURL} />
          <p>{text}</p>
        </div>
      </MessageContainer>
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

      <SendChat onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          >
        </button>
      </SendChat>
    </>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.25rem 0;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: start;
    width: 100%;
  }

  p {
    margin: 0;
    border-radius: ${theme.borderRadius};
    padding: 0.25rem 0.5rem;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 2px 5px;
  }

  .sent {
    flex-direction: row-reverse;
  }

  .sent {
    align-self: flex-end;
  }

  .sent > p {
    color: white;
    background-color: #0b93f6;
    align-self: flex-end;
  }

  .received > p {
    background-color: #e5e5ea;
    color: black;
  }

  .received {
  }
`;

const SendChat = styled.form`
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: rgb(24, 23, 23);
  width: 100%;
  max-width: 728px;
  display: flex;
  font-size: 1.5rem;

  button {
    width: 20%;
    background-color: rgb(56, 56, 143);
  }

  input {
    line-height: 1.5;
    width: 100%;
    font-size: 1.5rem;
    background: rgb(58, 58, 58);
    color: white;
    outline: none;
    border: none;
    padding: 0 10px;
  }
`;

const RoomContainer = styled.div`
  background-color: ${theme.colors.blue200};
  border-radius: ${theme.borderRadius};
  text-align: center;
  margin: 0.25rem 0;
  max-width: 300px;

  &:hover {
    background-color: ${theme.colors.blue300};
    cursor: pointer;
  }
`;

const MyForm = styled.form`
  input {
    border: transparent;
    border-radius: 0.25rem 0 0 0.25rem;
    background-color: ${theme.colors.grey100};
    padding: 0.25rem;
  }

  input:focus {
    outline: none;
  }

  button {
    border-radius: 0 0.25rem 0.25rem 0;
    border: transparent;
    background-color: ${theme.colors.blue200};
    color: ${theme.colors.grey700};
    padding: 0.25rem;
  }
  button:disabled {
    color: ${theme.colors.grey500};

    background-color: ${theme.colors.blue100};
  }
  button:hover {
    cursor: pointer;
  }
`;
