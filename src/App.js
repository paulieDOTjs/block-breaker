import React, { useReducer, useEffect } from "react";
import "./App.css";
import Paddle from "./components/Paddle/Paddle";
import Ball from "./components/Ball/Ball";

const initialState = {
  paddle: {
    x: 0
  },
  ball: {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5
  }
};

function keepPaddleInBox(value) {
  if (value < 0) {
    value = 0;
  }
  if (value > 396) {
    value = 396;
  }
  return value;
}

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE":
      return { ...state, paddle: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const windowWidth = window.innerWidth;
  const containerWidth = 496;
  const containerHeight = 600;
  const containerMargin = (windowWidth - containerWidth) / 2;
  const ballSize = 16;

  function handleMouse(e) {
    const paddleMovement = keepPaddleInBox(e.x - containerMargin);
    dispatch({
      type: "MOVE_PADDLE",
      payload: {
        x: paddleMovement
      }
    });
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      if (x + dx > containerWidth - ballSize || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy > containerHeight - ballSize || y + dy < 0) {
        dy = -dy;
      }
      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + dx,
          y: state.ball.y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="App" style={{height: containerHeight, width: containerWidth}}>
      <Paddle paddleX={state.paddle.x} />
      <Ball pos={state.ball} />
    </div>
  );
}
