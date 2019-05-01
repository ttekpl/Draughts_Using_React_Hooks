import React from "react";
import { createGlobalStyle } from "styled-components";

import Game from "./components/Game";

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
    width:100%;
    min-width:800px;
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
