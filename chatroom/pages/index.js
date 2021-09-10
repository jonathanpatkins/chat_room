import Head from "next/head";
import Image from "next/image";
import React, { useState, Component, useRef } from "react";
import Layout from "../components/Layout";
import Button from "react-bootstrap/Button";

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
      <h1>Here will be the holding page for the app</h1>
      <section>{user ? <ListOfChats /> : <SignIn />}</section>
    </Layout>
  );
}
