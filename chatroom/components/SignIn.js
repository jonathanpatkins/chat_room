import React, { useState, Component, useRef } from "react";
import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Button variant="primary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      <p>Do not violate the community guidelines</p>
    </>
  );
};
