import React from "react";
import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { auth } from "../utils/firebase";

import styled from "styled-components";

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Wrapper>
        <div>
          <Button variant="primary" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
          <h4>Do not violate the community guidelines</h4>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    margin-top: 0.5rem;
  }
`;
