import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Piece from "./components/Piece";

function Game() {
  const [values, setValues] = useState(Array(8).fill(Array(8).fill("none")));

  const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 600px;
    align-items: center;
    justify-content: center;
    background-color: burlywood;
  `;

  return <Board>{values.map(val => val.map(v => <div>{v}</div>))}</Board>;
}

function App() {
  const GlobalStyle = createGlobalStyle`
  body{
   margin:0;
   padding:0;
   background:linear-gradient(45deg , blue,violet);
   height:100vh;
   width:100vw;
  }
  .App{
    display: flex;
    align-items: center;
    justify-content: center;
    height:100vh;
    width:100%
  }
  `;

  return (
    <div className="App">
      <GlobalStyle />
      <Game />
    </div>
  );
}

export default App;
