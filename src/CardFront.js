import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "./AppContext";

export default function CardFront({ i, card, foundation = false }) {
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

  function handleDragStart() {
    if (card.value === foundationStartValue) {
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );
      const targetFoundation = foundationStore[nextFoundationIndex];
      setDropTargetIndex(nextFoundationIndex);
      setDropTargetBounds(targetFoundation.bounds);
    }
    //2. suit already has a row... find suit foundation index and bounds
    const existingFoundation = foundationStore.find(
      (el) => el.suit === card.suit
    );
    console.log("existingFoundation:", existingFoundation);
    if (existingFoundation) {
      const foundationIndex = foundationStore.findIndex(
        (el) => el.suit === card.suit
      );
      console.log("foundationIndex:", foundationIndex);
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

  function handleDragEnd(e) {
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
      newFoundation.cards = [...newFoundation.cards, card];
      foundationStoreCopy[dropTargetIndex] = newFoundation;

      updateFoundationStore(foundationStoreCopy);
      removeCardFromTableau();
    } else {
      console.log("invalid drop");
    }
  }

  return (
    <CardFrontStyle
      foundation={foundation}
      key={"front"}
      offset={`${i * 5}px`}
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
    >
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
  z-index: ${(props) => (props.foundation ? 0 : 100)};

  .cardSuit,
  .cardValue {
    font-size: 25px;
  }
`;
