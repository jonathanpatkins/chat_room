import React, { useState, useRef } from "react";

import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";

import { firestore, auth } from "../utils/firebase";
import firebase from "firebase/app";

import { useCollectionData } from "react-firebase-hooks/firestore";

import styled from "styled-components";

import { theme } from "../styles/theme";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { AiOutlinePlus } from "react-icons/ai";

export const ListOfChats = () => {
  const roomsRef = firestore.collection("numberOfRooms");
  const query = roomsRef.orderBy("createdAt");
  const [chatroom, setChatroom] = useState(null);

  const [rooms] = useCollectionData(query, { idField: "id" });

  return (
    <React.Fragment>
      {chatroom ? (
        <ChatRoom roomNumber={chatroom} setChatroom={setChatroom} />
      ) : (
        <PickChat rooms={rooms} setChatroom={setChatroom} roomsRef={roomsRef} />
      )}
    </React.Fragment>
  );
};

export const PickChat = ({ rooms, setChatroom, roomsRef }) => {
  const [formValue, setFormValue] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const newRoom = async (e) => {
    // 1. add a new chat to firebase
    // 2. set us to the new room

    let makeNew = true;
    for (const i in rooms) {
      if (rooms[i].text == formValue) {
        makeNew = false;
      }
    }
    e.preventDefault();
    if (makeNew) {
      await roomsRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setFormValue("");
      setChatroom(formValue);
    } else {
      setFormValue("");
      handleClick();
    }
  };
  return (
    <React.Fragment>
      <SignOut />
      <Wrapper fluid>
        {rooms &&
          rooms.map((room) => {
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
        <h5 style={{ margin: "1rem .5rem .5rem .5rem" }}>Add a new chat</h5>
        <MyForm onSubmit={newRoom}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter chat room name"
          />
          <button type="submit" disabled={!formValue}>
            <AiOutlinePlus />
          </button>
        </MyForm>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Chat room names must be unique"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <MessageContainer fluid>
        <div className={messageClass}>
          <img src={photoURL} />
          <p>{text}</p>
        </div>
      </MessageContainer>
    </>
  );
};

export const ChatRoom = ({ roomNumber, setChatroom }) => {
  const dummy = useRef();
  const messagesRef = firestore.collection(`messages${roomNumber}`);
  const query = messagesRef.orderBy("createdAt", "desc").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

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
      <Chat fluid>
        <div className={"header"}>
          <h3>{roomNumber}</h3>
          <Button
            onClick={() => {
              setChatroom(null);
            }}
          >
            Go Back &rsaquo;
          </Button>
        </div>
        <div className={"chatmessages"}>
          <span ref={dummy}></span>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <SendChat onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="type something in"
          />
          <button type="submit" disabled={!formValue}>
            >
          </button>
        </SendChat>
      </Chat>
    </>
  );
};

const Chat = styled(Container)`
  padding: 0;
  margin: 0;
  max-width: 700px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.grey100};

  .header {
    text-align: center;
    background-color: ${theme.colors.grey900};
    color: ${theme.colors.grey50};
    padding: 0.75rem;
  }

  .header h3 {
    margin: 0 0 0.5rem 0;
  }

  .chatmessages {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    flex: 1;
    padding: 0 0.5rem;
  }
`;

const SendChat = styled.form`
  height: 3rem;
  background-color: ${theme.colors.grey900};
  /* width: 100%; */
  /* max-width: 728px; */
  display: flex;
  font-size: 1.5rem;

  button {
    width: 3rem;
    background-color: ${theme.colors.blue700};
    color: white;
  }
  button:hover {
    cursor: pointer;
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

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 728px;
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
    max-width: 65%;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 2px 5px;
  }

  .sent {
    flex-direction: row-reverse;
    align-self: flex-end;
    /* justify-content: center; */
    align-items: center;
  }

  .sent > p {
    color: white;
    background-color: #0b93f6;
    /* align-self: flex-end;
    justify-self: center; */
    overflow: auto;
  }

  .received > p {
    background-color: #e5e5ea;
    color: black;
    overflow: auto;
  }

  .received {
    align-items: center;
  }
`;

const RoomContainer = styled.div`
  background-color: ${theme.colors.blue500};
  border-radius: ${theme.borderRadius};
  text-align: center;
  margin: 0.25rem 0.5rem;
  max-width: 400px;
  color: ${theme.colors.grey50};

  &:hover {
    background-color: ${theme.colors.blue600};
    cursor: pointer;
  }
`;

const MyForm = styled.form`
  margin: 0 0.5rem;
  input {
    border: transparent;
    border-radius: 0.25rem 0 0 0.25rem;
    background-color: ${theme.colors.grey100};
    padding: 0.25rem;
    width: calc(100% - 2rem);
  }

  input:focus {
    outline: none;
  }

  button {
    border-radius: 0 0.25rem 0.25rem 0;
    border: transparent;
    background-color: ${theme.colors.blue500};
    color: ${theme.colors.grey50};
    padding: 0.25rem 0.5rem;
    width: 2rem;
  }
  button:disabled {
    color: ${theme.colors.grey50};

    background-color: ${theme.colors.blue400};
  }
  button:hover {
    cursor: pointer;
  }
`;

const SignOut = () => {
  return (
    auth.currentUser && (
      <SignOutButton onClick={() => auth.signOut()}>Sign Out</SignOutButton>
    )
  );
};

const Wrapper = styled(Container)`
  background-color: ${theme.colors.green200};
  padding: 1rem;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.darkShadow};
  margin: 3.5rem 1rem 1rem 1rem;
  /* transform: translateX(-1rem); */
`;

const SignOutButton = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;
