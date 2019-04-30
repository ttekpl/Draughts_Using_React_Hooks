import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Piece from "./components/Piece";

function Game() {
  const [values, setValues] = useState(
    Array(8).fill(
      Array(8).fill({ isCovered: false, black: false, isPieceClicked: false })
    )
  );

  useEffect(() => {
    const newValues = values.map((val, i) =>
      val.map((v, index) => {
        if (i < 3) {
          if ((i + 1) % 2 === 0 && (index + 2) % 2 === 0)
            return { isCovered: true, black: false, isClicked: false };
          else if ((i + 1) % 2 !== 0 && (index + 1) % 2 === 0)
            return { isCovered: true, black: false, isClicked: false };
          else return { isCovered: false, isClicked: false, black: false };
        } else if (i > 4) {
          if ((i + 1) % 2 === 0 && (index + 2) % 2 === 0)
            return { isCovered: true, black: true, isClicked: false };
          else if ((i + 1) % 2 !== 0 && (index + 1) % 2 === 0)
            return { isCovered: true, black: true, isClicked: false };
          else return { isCovered: false, isClicked: false, black: false };
        } else return { isCovered: false, isClicked: false, black: false };
      })
    );

    setValues(newValues);
  }, []);

  const onPieceClick = (i, index, black, isBlackNext) => {
    if (black && isBlackNext) {
      if (!values[i][index].isClicked) {
        const newValues = values.map((val, i) =>
          val.map((v, index) => {
            return { isCovered: v.isCovered, black: v.black, isClicked: false };
          })
        );

        newValues[i][index].isClicked = true;
        setValues(newValues);
        console.log(newValues);
      }
    } else if (!black && !isBlackNext) {
      const newValues = values.map((val, i) =>
        val.map((v, index) => {
          return { isCovered: v.isCovered, black: v.black, isClicked: false };
        })
      );

      newValues[i][index].isClicked = true;
      setValues(newValues);
      console.log(newValues);
    }
  };

  const [isBlackNext, setIsBlackNext] = useState(false);

  const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 600px;
    height: 600px;
    align-items: center;
    justify-content: center;
    background-color: burlywood;
  `;

  const Field = styled.div`
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    background-color: ${props => (props.brown ? "brown" : "burlywood")};
    &::after {
      content: "";
      width: 75px;
      height: ${props => (props.isClicked ? "75px" : "0px")};
      position: absolute;
      top: 0;
      left: 0;
      background-color: green;
      opacity: 0.5;
      z-index: 1;
    }
  `;
  //  onPieceClick = (i, index, black, isBlackNext)
  return (
    <Board>
      {values.map((val, i) =>
        val.map((v, index) => {
          console.log(i);
          return (
            <Field
              brown={
                ((i + 1) % 2 === 0 ? index + 2 : index + 1) % 2 === 0
                  ? true
                  : false
              }
              isClicked={v.isClicked}
            >
              {v.isCovered ? (
                <Piece
                  black={v.black}
                  isBlackNext={isBlackNext}
                  onClick={() => onPieceClick(i, index, v.black, isBlackNext)}
                />
              ) : null}
            </Field>
          );
        })
      )}
    </Board>
  );
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
