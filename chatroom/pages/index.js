import Head from "next/head";
import Image from "next/image";
import React, { useState, Component, useRef } from "react";
import Layout from "../components/Layout";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { firestore, auth } from "../utils/firebase";

import { SignIn } from "../components/SignIn";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { ListOfChats } from "../components/Chats";

import styled from "styled-components";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout>
      <IndexContainer fluid>
        <div>
          <h3>List of Rooms</h3>
          <section>{user ? <ListOfChats /> : <SignIn />}</section>
        </div>
      </IndexContainer>
    </Layout>
  );
}

const IndexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
