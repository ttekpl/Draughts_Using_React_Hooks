import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Piece from "./Piece";

function Game() {
  const [values, setValues] = useState(
    Array(8).fill(
      Array(8).fill({
        isCovered: false,
        black: false,
        isPieceClicked: false,
        canBeatHere: false
      })
    )
  );

  useEffect(() => {
    const newValues = values.map((val, i) =>
      val.map((v, index) => {
        if (i < 3) {
          if ((i + 1) % 2 === 0 && (index + 2) % 2 === 0)
            return {
              isCovered: true,
              black: false,
              isPieceClicked: false,
              canBeatHere: false
            };
          else if ((i + 1) % 2 !== 0 && (index + 1) % 2 === 0)
            return {
              isCovered: true,
              black: false,
              isPieceClicked: false,
              canBeatHere: false
            };
          else
            return {
              isCovered: false,
              isPieceClicked: false,
              black: false,
              canBeatHere: false
            };
        } else if (i > 4) {
          if ((i + 1) % 2 === 0 && (index + 2) % 2 === 0)
            return {
              isCovered: true,
              black: true,
              isPieceClicked: false,
              canBeatHere: false
            };
          else if ((i + 1) % 2 !== 0 && (index + 1) % 2 === 0)
            return {
              isCovered: true,
              black: true,
              isPieceClicked: false,
              canBeatHere: false
            };
          else
            return {
              isCovered: false,
              isPieceClicked: false,
              black: false,
              canBeatHere: false
            };
        } else
          return {
            isCovered: false,
            isPieceClicked: false,
            black: false,
            canBeatHere: false
          };
      })
    );

    setValues(newValues);
  }, []);

  const [isAnyPieceClicked, setIsAnyPieceClicked] = useState(false);

  const checkMoveOptions = newValues => {
    newValues.map((val, i) =>
      val.map((v, index) => {
        //   For White Next Turn Only
        if (isBlackNext && !v.black && v.isCovered) {
          console.log(isBlackNext);
          if (index === 0) {
            if (!newValues[i + 1][index + 1].isCovered)
              newValues[i + 1][index + 1].canMoveHere = true;
            else {
              if (
                !newValues[i + 2][index + 2].isCovered &&
                newValues[i + 1][index + 1].black
              )
                newValues[i + 2][index + 2].canBeatHere = true;
            }
          } else if (index === 7) {
            if (!newValues[i + 1][index - 1].isCovered)
              newValues[i + 1][index - 1].canMoveHere = true;
            else {
              if (
                !newValues[i + 2][index - 2].isCovered &&
                newValues[i + 1][index - 1].black
              )
                newValues[i + 2][index - 2].canBeatHere = true;
            }
          } else {
            if (!newValues[i + 1][index - 1].isCovered)
              newValues[i + 1][index - 1].canMoveHere = true;
            else {
              if (
                index - 1 !== 0 &&
                index - 1 !== 7 &&
                !newValues[i + 2][index - 2].isCovered &&
                newValues[i + 1][index - 1].black
              )
                newValues[i + 2][index - 2].canBeatHere = true;
            }
            if (!newValues[i + 1][index + 1].isCovered)
              newValues[i + 1][index + 1].canMoveHere = true;
            else {
              if (
                index + 1 !== 0 &&
                index + 1 !== 7 &&
                !newValues[i + 2][index + 2].isCovered &&
                newValues[i + 1][index + 1].black
              )
                newValues[i + 2][index + 2].canBeatHere = true;
            }
          }
        } else if (!isBlackNext && v.black && v.isCovered) {
          console.log(isBlackNext);
          if (index === 0) {
            if (!newValues[i - 1][index + 1].isCovered)
              newValues[i - 1][index + 1].canMoveHere = true;
            else {
              if (
                !newValues[i - 2][index + 2].isCovered &&
                !newValues[i - 1][index + 1].black
              )
                newValues[i - 2][index + 2].canBeatHere = true;
            }
          } else if (index === 7) {
            if (!newValues[i - 1][index - 1].isCovered)
              newValues[i - 1][index - 1].canMoveHere = true;
            else {
              if (
                !newValues[i - 2][index - 2].isCovered &&
                !newValues[i - 1][index - 1].black
              )
                newValues[i - 2][index - 2].canBeatHere = true;
            }
          } else {
            if (!newValues[i - 1][index - 1].isCovered)
              newValues[i - 1][index - 1].canMoveHere = true;
            else {
              if (
                index - 1 !== 0 &&
                index - 1 !== 7 &&
                !newValues[i - 2][index - 2].isCovered &&
                !newValues[i - 1][index - 1].black
              )
                newValues[i - 2][index - 2].canBeatHere = true;
            }
            if (!newValues[i - 1][index + 1].isCovered)
              newValues[i - 1][index + 1].canMoveHere = true;
            else {
              if (
                index + 1 !== 0 &&
                index + 1 !== 7 &&
                !newValues[i - 2][index + 2].isCovered &&
                !newValues[i - 1][index + 1].black
              )
                newValues[i - 2][index + 2].canBeatHere = true;
            }
          }
        }
      })
    );
  };

  const onPieceClick = (i, index, black, isBlackNext) => {
    if (black && isBlackNext) {
      if (!values[i][index].isPieceClicked) {
        setIsAnyPieceClicked(true);
        const newValues = values.map((val, i) =>
          val.map((v, index) => {
            return {
              isCovered: v.isCovered,
              black: v.black,
              isPieceClicked: false,
              canMoveHere: false,
              canBeatHere: v.canBeatHere
            };
          })
        );

        newValues[i][index].isPieceClicked = true;

        if (index === 0) {
          if (!newValues[i - 1][index + 1].isCovered)
            newValues[i - 1][index + 1].canMoveHere = true;
          else {
            if (
              !newValues[i - 2][index + 2].isCovered &&
              !newValues[i - 1][index + 1].black
            )
              newValues[i - 2][index + 2].canBeatHere = true;
          }
        } else if (index === 7) {
          if (!newValues[i - 1][index - 1].isCovered)
            newValues[i - 1][index - 1].canMoveHere = true;
          else {
            if (
              !newValues[i - 2][index - 2].isCovered &&
              !newValues[i - 1][index - 1].black
            )
              newValues[i - 2][index - 2].canBeatHere = true;
          }
        } else {
          if (!newValues[i - 1][index - 1].isCovered)
            newValues[i - 1][index - 1].canMoveHere = true;
          else {
            if (
              index - 1 !== 0 &&
              index - 1 !== 7 &&
              !newValues[i - 2][index - 2].isCovered &&
              !newValues[i - 1][index - 1].black
            )
              newValues[i - 2][index - 2].canBeatHere = true;
          }
          if (!newValues[i - 1][index + 1].isCovered)
            newValues[i - 1][index + 1].canMoveHere = true;
          else {
            if (
              index + 1 !== 0 &&
              index + 1 !== 7 &&
              !newValues[i - 2][index + 2].isCovered &&
              !newValues[i - 1][index + 1].black
            )
              newValues[i - 2][index + 2].canBeatHere = true;
          }
        }

        setValues(newValues);
      }
    } else if (!black && !isBlackNext) {
      setIsAnyPieceClicked(true);
      const newValues = values.map((val, i) =>
        val.map((v, index) => {
          return {
            isCovered: v.isCovered,
            black: v.black,
            isPieceClicked: false,
            canMoveHere: false,
            canBeatHere: v.canBeatHere
          };
        })
      );
      if (index === 0) {
        if (!newValues[i + 1][index + 1].isCovered)
          newValues[i + 1][index + 1].canMoveHere = true;
        else {
          if (
            !newValues[i + 2][index + 2].isCovered &&
            newValues[i + 1][index + 1].black
          )
            newValues[i + 2][index + 2].canBeatHere = true;
        }
      } else if (index === 7) {
        if (!newValues[i + 1][index - 1].isCovered)
          newValues[i + 1][index - 1].canMoveHere = true;
        else {
          if (
            !newValues[i + 2][index - 2].isCovered &&
            newValues[i + 1][index - 1].black
          )
            newValues[i + 2][index - 2].canBeatHere = true;
        }
      } else {
        if (!newValues[i + 1][index - 1].isCovered)
          newValues[i + 1][index - 1].canMoveHere = true;
        else {
          if (
            index - 1 !== 0 &&
            index - 1 !== 7 &&
            !newValues[i + 2][index - 2].isCovered &&
            newValues[i + 1][index - 1].black
          )
            newValues[i + 2][index - 2].canBeatHere = true;
        }
        if (!newValues[i + 1][index + 1].isCovered)
          newValues[i + 1][index + 1].canMoveHere = true;
        else {
          if (
            index + 1 !== 0 &&
            index + 1 !== 7 &&
            !newValues[i + 2][index + 2].isCovered &&
            newValues[i + 1][index + 1].black
          )
            newValues[i + 2][index + 2].canBeatHere = true;
        }
      }
      newValues[i][index].isPieceClicked = true;
      setValues(newValues);
    }
  };

  const onFieldClick = (i, index, isBlackNext) => {
    let color;
    let canMove = true;
    const newValues = values.map((val, i) =>
      val.map((v, index) => {
        if (v.canBeatHere) {
          canMove = false;
        }

        if (v.isPieceClicked) {
          color = v.black;
          return {
            isCovered: false,
            black: false,
            isPieceClicked: false,
            canMoveHere: false,
            canBeatHere: false
          };
        } else {
          return {
            isCovered: v.isCovered,
            black: v.black,
            isPieceClicked: false,
            canMoveHere: false,
            canBeatHere: false
          };
        }
      })
    );

    if (!canMove) return alert("You must beat");
    newValues[i][index].isCovered = true;
    newValues[i][index].black = color;

    checkMoveOptions(newValues);
    setIsAnyPieceClicked(false);
    setValues(newValues);
    setIsBlackNext(!isBlackNext);
  };

  const onBeatFieldClick = (i, index, isBlackNext) => {
    let color;
    let triggerI;
    let triggerIndex;

    const newValues = values.map((val, i) =>
      val.map((v, index) => {
        if (v.isPieceClicked) {
          color = v.black;
          triggerI = i;
          triggerIndex = index;
          return {
            isCovered: false,
            black: false,
            isPieceClicked: false,
            canMoveHere: false,
            canBeatHere: false
          };
        } else {
          return {
            isCovered: v.isCovered,
            black: v.black,
            isPieceClicked: false,
            canMoveHere: false,
            canBeatHere: false
          };
        }
      })
    );
    newValues[i][index].isCovered = true;
    newValues[i][index].black = color;
    newValues[(i + triggerI) / 2][(index + triggerIndex) / 2].isCovered = false;
    checkMoveOptions(newValues);
    setIsAnyPieceClicked(false);
    setValues(newValues);
    setIsBlackNext(!isBlackNext);
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
    border: 10px solid saddlebrown;
    box-shadow: 0 0 10px -6px #333;
  `;

  const Field = styled.div`
      width: 75px;
      height: 75px;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      background-color: ${props => (props.brown ? "brown" : "burlywood")};
      ${props => (props.isClicked ? "background-color:green" : "")}
      ${props => (props.isBeatField ? "background-color:red" : "")}
      /* &::after {
        content: "";
        width: 75px;
        height: ${props => (props.isClicked ? "75px" : "0px")};
        position: absolute;
        top: 0;
        left: 0;
        background-color: green;
        opacity: 0.5;
        z-index: 1;
      } */
    `;

  const Informator = styled.h1`
    text-transform: uppercase;
    position: fixed;
    left: 10px;
    width: 20vw;
    top: 20%;
    transform: translateY(-50%);
    font-size: 30px;
    color: white;
    font-weight: bold;
    font-family: sans-serif;
  `;
  //  onPieceClick = (i, index, black, isBlackNext)
  return (
    <>
      <Board>
        {values.map((val, i) =>
          val.map((v, index) => {
            let moveFn;
            if (v.canBeatHere) {
              moveFn = () => {
                onBeatFieldClick(i, index, isBlackNext);
              };
            } else if (v.canMoveHere) {
              moveFn = () => {
                onFieldClick(i, index, isBlackNext);
              };
            } else {
              moveFn = null;
            }
            return (
              <Field
                key={`${i}${index}`}
                brown={
                  ((i + 1) % 2 === 0 ? index + 2 : index + 1) % 2 === 0
                    ? true
                    : false
                }
                isClicked={
                  (v.isPieceClicked || v.canMoveHere) && isAnyPieceClicked
                }
                isBeatField={v.canBeatHere}
                onClick={isAnyPieceClicked ? moveFn : null}
              >
                {v.isCovered ? (
                  <Piece
                    key={`${i}${index}`}
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
      <Informator>
        It is {isBlackNext ? "Black" : " white"}'s player turn
      </Informator>
    </>
  );
}

export default Game;
