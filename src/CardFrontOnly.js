import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function CardFrontOnly({ i, card }) {
  return (
    <CardFrontStyle offset={`${i * 10}px`}>
      <p className="cardValue">{card.value}</p>
      <p className="cardSuit">{card.suit}</p>
    </CardFrontStyle>
  );
}

const CardFrontStyle = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background: white;
  color: black;
  display: grid;
  grid-template-rows: repeat(2, 50px);
  place-items: center;
  border-radius: 5px;
  backface-visibility: hidden;

  .cardSuit,
  .cardValue {
    font-size: 25px;
  }
`;
