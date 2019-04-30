import React, { useState } from "react";
import styled from "styled-components";

const Piece = ({ black, onClick }) => {
  const Pawn = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: ${props => (props.black ? "black" : "white")};
    box-shadow: 0 0 20px -6px #333;
  `;
  return <Pawn black={black} onClick={onClick} />;
};

export default Piece;
