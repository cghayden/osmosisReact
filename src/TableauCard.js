import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppState } from "./AppContext";
import styled from "styled-components";
// import wait from "waait";

import {
  CardFront,
  CardFont,
  FullCardFaceDiv,
  CardCorner,
  CardBack,
} from "./CardStyles";
export default function TableauCard({ card, top, left, facedown = false }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();

  const {
    foundationStore,
    updateFoundationStore,
    foundationStartValue,
    tableauStore,
    updateTableauStore,
    dealing,
    stockBounds,
    setClickBounds,
  } = useAppState();

  function handleMouseDown() {
    setDropTargetValues();
  }

  function handleMouseUp(e) {
    if (!dropTargetBounds) {
      return;
    }
    const targetCardRect = e.target.getBoundingClientRect();
    setClickBounds((clickBounds) => {
      return {
        ...clickBounds,
        clickPlay: true,
        sourceLeft: targetCardRect.left,
        sourceTop: targetCardRect.top,
      };
    });
    const newFoundation = { ...foundationStore[dropTargetIndex] };
    const foundationStoreCopy = [...foundationStore];
    if (!newFoundation.suit) {
      newFoundation.suit = card.suit;
    }
    newFoundation.cards = [...newFoundation.cards, card];
    foundationStoreCopy[dropTargetIndex] = newFoundation;
    updateFoundationStore(foundationStoreCopy);
    removeCardFromTableau();
  }

  function removeCardFromTableau() {
    const tableauCopy = { ...tableauStore };
    tableauCopy[card.startLocation].pop();
    updateTableauStore(tableauCopy);
    // setClickBounds();
  }

  function handleDragEnd(e) {
    if (!dropTargetBounds) {
      return;
    }
    const dropPosition = { x: ~~e.clientX, y: ~~e.clientY };

    if (
      dropTargetBounds.left < dropPosition.x &&
      dropPosition.x < dropTargetBounds.right &&
      dropTargetBounds.top < dropPosition.y &&
      dropPosition.y < dropTargetBounds.bottom
    ) {
      const newFoundation = { ...foundationStore[dropTargetIndex] };
      const foundationStoreCopy = [...foundationStore];
      if (!newFoundation.suit) {
        newFoundation.suit = card.suit;
      }
      newFoundation.cards = [...newFoundation.cards, card];
      foundationStoreCopy[dropTargetIndex] = newFoundation;
      updateFoundationStore(foundationStoreCopy);
      removeCardFromTableau();
    } else {
      return;
    }
    //need to reset dropTargetValues to undefined
  }

  function setDropTargetValues() {
    setClickBounds((clickBounds) => {
      return {
        ...clickBounds,
        clickPlay: false,
      };
    });
    //options: 1. =startValue, set in a new foundationRow
    if (card.value === foundationStartValue) {
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );

      const targetFoundation = foundationStore[nextFoundationIndex];
      console.log("targetFoundation:", targetFoundation);
      setDropTargetIndex(nextFoundationIndex);
      setDropTargetBounds(targetFoundation.bounds);
      return;
    }
    //2. suit already has a row... find suit foundation index and bounds
    const existingFoundationIndex = foundationStore.findIndex(
      (el) => el.suit === card.suit
    );
    if (existingFoundationIndex === -1) {
      // no drop values set
      setDropTargetIndex();
      setDropTargetBounds();
      return;
    }
    if (existingFoundationIndex === 0) {
      const existingFoundation = foundationStore.find(
        (el) => el.suit === card.suit
      );
      setDropTargetIndex(existingFoundationIndex);
      setDropTargetBounds(existingFoundation.bounds);
      return;
    }
    //if existing index is 1,
    if (existingFoundationIndex > 0) {
      //check if  previous foundation has the dragged card's value:
      const previousFoundationHasValue = foundationStore[
        existingFoundationIndex - 1
      ].cards.filter(
        (previousFoundationCard) => previousFoundationCard.value === card.value
      );
      if (previousFoundationHasValue.length > 0) {
        const existingFoundation = foundationStore.find(
          (el) => el.suit === card.suit
        );
        setDropTargetIndex(existingFoundationIndex);
        setDropTargetBounds(existingFoundation.bounds);
      }
    }
    //3.  value not starter and suit not in a row.
    else {
      setDropTargetIndex(null);
      setDropTargetBounds(null);
    }
    return;
  }

  const cardVariants = {
    initial: (custom) => {
      return {
        translateX: custom.dealing ? custom.stockLeft - custom.left : 0,
        translateY: custom.dealing ? custom.stockTop - custom.top : 0,
      };
    },
    animate: {
      translateX: 0,
      translateY: 0,
    },
  };

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {facedown ? (
          <TabCardBack
            custom={{
              dealing,
              top,
              left,
              stockLeft: stockBounds.left,
              stockTop: stockBounds.top,
            }}
            variants={cardVariants}
            initial={"initial"}
            animate={"animate"}
            top={top}
            left={left}
            key={"b"}
            exit={{
              rotateY: 90,
              translateX: -40,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          />
        ) : (
          <TabCardFront
            custom={{
              dealing,
              top,
              left,
              stockLeft: stockBounds.left,
              stockTop: stockBounds.top,
            }}
            variants={cardVariants}
            initial={"initial"}
            animate={"animate"}
            red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
            key={"f"}
            top={top}
            left={left}
            exit={{ rotateY: 0 }}
            drag
            onDragStart={setDropTargetValues}
            onDragEnd={(e) => handleDragEnd(e)}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <CardCorner>
              <p>{card.value}</p>
              <p>{card.suit}</p>
            </CardCorner>
            <FullCardFaceDiv>
              <CardFont>{card.value}</CardFont>
              <CardFont>{card.suit}</CardFont>
            </FullCardFaceDiv>
          </TabCardFront>
        )}
      </AnimatePresence>
    </>
  );
}

const TabCardBack = styled(CardBack)`
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  position: fixed;
`;

const TabCardFront = styled(CardFront)`
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  position: fixed;
`;
