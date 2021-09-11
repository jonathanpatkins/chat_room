import Head from "next/head";
import Image from "next/image";
import React, { useState, Component, useRef } from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import theme from "../styles/theme";

import { firestore, auth } from "../utils/firebase";

import { SignIn } from "../components/SignIn";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";

import { ListOfChats } from "../components/Chats";

import styled from "styled-components";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout title={"Chat App"}>
      <IndexContainer fluid>
        {/* <h3>List of Rooms</h3> */}
        <section>{user ? <ListOfChats /> : <SignIn />}</section>
      </IndexContainer>
    </Layout>
  );
}

const IndexContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.green100};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;
