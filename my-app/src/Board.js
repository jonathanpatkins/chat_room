import React, { useRef, useEffect } from "react";
import "./Board.css";

import io from "socket.io-client";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

if (!firebase.apps.length) {
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
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
// var lastUpdate

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  // This is how something gets put into the database
  const strokesRef = firestore.collection(`board1`);
  const query = strokesRef.orderBy("createdAt");

  const [strokes] = useCollectionData(query, { idField: "id" });

  const sendMessage = async (x0, y0, x1, y1, color) => {
    await strokesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      color,
    });
  };

  let drawing = false;

  const drawLine = (x0, y0, x1, y1, color) => {
    const b = canvasRef.current;
    const a = b.getContext("2d");

    const w = b.width;
    const h = b.height;

    console.log(x0);
    console.log(y0);
    console.log(x1);
    console.log(y1);

    a.beginPath();
    a.moveTo(x0 * w, y0 * h);
    a.lineTo(x1 * w, y1 * h);
    a.strokeStyle = color;
    a.lineWidth = 2;
    a.stroke();
    a.closePath();

    socketRef.current.emit("drawing", {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      color,
    });

    console.log("what is going on");
  };

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");

    // set the current color
    const current = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }

      const canvas = canvasRef.current;
      const w = canvas.width;
      const h = canvas.height;

      const x0 = current.x / w;
      const y0 = current.y / h;
      const x1 = (e.clientX || e.touches[0].clientX) / w;
      const y1 = (e.clientY || e.touches[0].clientY) / h;

      //  if (Math.abs(current.x - (e.clientX || e.touches[0].clientX)) + Math.abs(current.y - (e.clientY || e.touches[0].clientY)) > 50) {
      drawLine(x0, y0, x1, y1, current.color);
      sendMessage(x0, y0, x1, y1, current.color);

      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
      //  }
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      // drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
      // sendMessage(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width =
        document.getElementsByClassName("whiteboard")[0].clientWidth;
      canvas.height =
        document.getElementsByClassName("whiteboard")[0].clientHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };
    socketRef.current = io.connect("/");
    socketRef.current.on("drawing", onDrawingEvent);
  }, []);

  function doStrokes() {
    strokes.map((stroke) =>
      drawLine(stroke.x0, stroke.y0, stroke.x1, stroke.y1, stroke.color)
    );
  }

  //   function updateCanvas() {
  //     document.getElementsByClassName("whiteboard")[0].innerHTML = "";
  //     if (strokes) {
  //       strokes.map((stroke) => doStrokes());
  //     }
  //   }

  //   setInterval(updateCanvas, 1000);

  // ------------- The Canvas and color elements --------------------------

  return (
    <React.Fragment>
      <div className="centered">
        <canvas ref={canvasRef} className="whiteboard">
          {/* {strokes && strokes.map(stroke => doStrokes())} */}
        </canvas>

        <div ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
        </div>
      </div>
      <Button onClick={doStrokes} variant="contained">
        Default
      </Button>
    </React.Fragment>
  );
};

export default Board;

// what if the person drawing got things in real time
// but I added a function called update using set interval that every half second
// would then check the database and redraw the lines from that only drawing lines after a certain time
// that was on the board for th

// maybe there is a way to add an id to the stroke and then when querrying for strokes it only ends up drawing the querries that are not itself

// another idea is to keep track of the last time the board was updated and if things come before then ignore it

// we could store stuff in that data base and on reload it grabs it from there and after that socketio stuff takes over
// should also be able to change the pen size with a slider
