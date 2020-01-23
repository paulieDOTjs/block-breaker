import React from "react";
import Paddle from "./components/paddle/paddle";
import Ball from "./components/ball/ball";

export default function App() {
  return (
    <div className="App">
      <Ball />
      <Paddle />
      <Paddle />
    </div>
  );
}
