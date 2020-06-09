import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CardFront = styled(motion.div)`
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

  .cardSuit,
  .cardValue {
    font-size: 25px;
  }
`;

const CardBack = styled.div`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: aqua;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  perspective: 1000px;
  backface-visibility: hidden;
`;

export default function Card({
  facedown,
  i,
  card = { uid: 0, suit: "p", value: 20 },
}) {
  if (!facedown) {
    return (
      <CardFront drag offset={`${i * 5}px`}>
        <p className="cardValue">{card.value}</p>
        <p className="cardSuit">{card.suit}</p>
      </CardFront>
    );
  }

  return <CardBack offset={`${i * 5}px`} />;
}
