import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "./AppContext";

export default function Card({ facedown = false, i, card }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();
  const [dropTargetRef, setDropTargetRef] = useState();
  const { foundationStore, foundationStartValue } = useAppState();

  // useEffect(setDropTargetValues, [card]);

  function setDropTargetValues() {
    //options: 1. =startValue, set in a new foundationRow
    if (card.value === foundationStartValue) {
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );
      console.log("nextFoundationIndex:", nextFoundationIndex);
      const targetFoundation = foundationStore[nextFoundationIndex];
      setDropTargetIndex(nextFoundationIndex);
      setDropTargetBounds(targetFoundation.bounds);
      setDropTargetRef(targetFoundation.ref);
    }
    //2. suit already has a row... find suit foundation index and bounds
    const existingFoundation = foundationStore.find(
      (el) => el.suit === card.suit
    );
    if (existingFoundation) {
      console.log("suit has a Foundation:", existingFoundation.bounds);
      const foundationIndex = foundationStore.findIndex(
        (el) => el.suit === card.suit
      );
      setDropTargetIndex(foundationIndex);
      setDropTargetBounds(existingFoundation.bounds);
    }
    //3.  value not starter and suit not in a row.
    else {
      setDropTargetIndex(null);
      setDropTargetBounds(null);
    }
    return;
  }

  function handleDragStart(e, info) {
    setDropTargetValues();
    console.log("start drag, card:", card);
  }

  function handleDragEnd(e, info) {
    const dropPosition = { x: ~~e.clientX, y: ~~e.clientY };
    if (!dropTargetBounds) {
      console.log("no play for this card");
      return;
    }

    if (
      dropTargetBounds.left < dropPosition.x &&
      dropPosition.x < dropTargetBounds.right &&
      dropTargetBounds.top < dropPosition.y &&
      dropPosition.y < dropTargetBounds.bottom
    ) {
      console.log("valid drop");
    } else {
      console.log("invalid drop");
    }
    //need to reset dropTargetValues to undefined
  }

  if (!facedown) {
    return (
      <CardFront
        offset={`${i * 5}px`}
        drag
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // dragConstraints={dropTargetBounds}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
      >
        <p className="cardValue">{card.value}</p>
        <p className="cardSuit">{card.suit}</p>
      </CardFront>
    );
  }

  return <CardBack offset={`${i * 5}px`} />;
}

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
