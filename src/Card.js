import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "./AppContext";
import CardFont from "./CardFont";
export default function Card({ facedown = false, i, card }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();

  const {
    foundationStore,
    updateFoundationStore,
    foundationStartValue,
    tableauStore,
    updateTableauStore,
  } = useAppState();

  function removeCardFromTableau() {
    const tableauCopy = { ...tableauStore };
    tableauCopy[card.startLocation].pop();
    updateTableauStore(tableauCopy);
  }

  function setDropTargetValues() {
    //options: 1. =startValue, set in a new foundationRow
    if (card.value === foundationStartValue) {
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );
      console.log("nextFoundationIndex:", nextFoundationIndex);
      const targetFoundation = foundationStore[nextFoundationIndex];
      console.log("nextFoundation bounds:", targetFoundation.bounds);
      setDropTargetIndex(nextFoundationIndex);
      setDropTargetBounds(targetFoundation.bounds);
      return;
    }
    //2. suit already has a row... find suit foundation index and bounds
    const existingFoundation = foundationStore.find(
      (el) => el.suit === card.suit
    );
    if (existingFoundation) {
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
  }

  function handleDragEnd(e, info) {
    const dropPosition = { x: ~~e.clientX, y: ~~e.clientY };
    if (!dropTargetBounds) {
      return;
    }

    if (
      dropTargetBounds.left < dropPosition.x &&
      dropPosition.x < dropTargetBounds.right &&
      dropTargetBounds.top < dropPosition.y &&
      dropPosition.y < dropTargetBounds.bottom
    ) {
      const newFoundation = { ...foundationStore[dropTargetIndex] };
      const foundationStoreCopy = [...foundationStore];
      if (!foundationStoreCopy.suit) {
        foundationStoreCopy.suit = card.suit;
      }
      newFoundation.cards = [...newFoundation.cards, card];
      foundationStoreCopy[dropTargetIndex] = newFoundation;
      updateFoundationStore(foundationStoreCopy);
      removeCardFromTableau();
    } else {
      console.log("invalid drop");
    }
    //need to reset dropTargetValues to undefined
  }

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {facedown ? (
        <CardBack
          offset={`${i * 5}px`}
          key={"b"}
          // initial={{ rotateY: 0 }}
          // animate={{ rotateY: 0 }}
          exit={{ rotateY: 90, translateX: -40, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <CardFront
          key={"f"}
          offset={`${i * 5}px`}
          // initial={{ rotateY: 0 }}
          // animate={{ rotateY: 0 }}
          exit={{ rotateY: 0 }}
          drag
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
        >
          <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
            {card.value}
          </CardFont>
          <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
            {card.suit}
          </CardFont>
        </CardFront>
      )}
    </AnimatePresence>
  );
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
  backface-visibility: hidden;
  z-index: 100;
`;

const CardBack = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: aqua;
  /* transition: transform 0.8s; */
  transform-style: preserve-3d;
  /* backface-visibility: hidden; */
`;
