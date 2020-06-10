import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// import { useAppState } from "./AppContext";

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
  opacity: ${(props) => (props.hidden ? 0.01 : 1)};

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

export default function Card({ facedown = false, i, card }) {
  // const { draggedCard, setDraggedCard } = useAppState();

  function handleDragStart(e, info) {
    console.log("start e:", e, "start info:", info);
    const suit = card.suit;
    console.log("suit:", suit);
    // setHidden(true);
  }

  function handleDragEnd(e, info) {
    console.log("end drag e:", e, "end drag info:", info);
    // e.dataTransfer.setDragImage(null, 0, 0);
    // setHidden(false);
  }

  if (!facedown) {
    return (
      <CardFront
        offset={`${i * 5}px`}
        drag
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <p className="cardValue">{card.value}</p>
        <p className="cardSuit">{card.suit}</p>
      </CardFront>
    );
  }

  return <CardBack offset={`${i * 5}px`} />;
}
