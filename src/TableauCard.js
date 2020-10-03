import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppState } from "./AppContext";
import styled from "styled-components";

import {
  CardFront,
  CardFaceFont,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
  CardBack,
} from "./CardStyles";
import wait from "waait";

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
    clickBounds,
    setClickBounds,
  } = useAppState();

  function removeCardFromTableau() {
    const tableauCopy = { ...tableauStore };
    tableauCopy[card.startLocation].pop();
    updateTableauStore(tableauCopy);
  }

  async function handleClick(e) {
    console.log("click");
    if (!clickBounds.clickPlay) return;
    e.persist();
    //set source x,y for animation to foundation
    const targetCardRect = e.target.getBoundingClientRect();
    setClickBounds((clickBounds) => {
      return {
        ...clickBounds,
        clickPlay: true,
        sourceLeft: targetCardRect.left,
        sourceTop: targetCardRect.top,
      };
    });
    //is card is a starter for a new foundation?
    // targetFoundation: {suit: null, cards: Array(0), bounds: DOMRect}
    if (card.value === foundationStartValue) {
      // find next foundation object where suit is unassigned
      const nextFoundationIndex = foundationStore.findIndex(
        (fndtn) => fndtn.suit === null
      );
      const targetFoundation = foundationStore[nextFoundationIndex];
      targetFoundation.suit = card.suit;
      targetFoundation.cards.push(card);
      removeCardFromTableau();
      return;
    }
    // not a starter: is there an existing foundation with same suit ?
    const existingFoundationIndex = foundationStore.findIndex(
      (el) => el.suit === card.suit
    );
    // yes; foundation of same suit in top foundation row
    if (existingFoundationIndex === 0) {
      const existingFoundationCopy = foundationStore.find(
        (el) => el.suit === card.suit
      );
      existingFoundationCopy.cards.push(card);
      removeCardFromTableau();
      return;
    }
    //yes, foundation of same suit in row 2,3,4( foundation store index 1,2,3)
    if (existingFoundationIndex > 0) {
      //check if  previous foundation has the dragged card's value:
      const previousFoundationHasValue = foundationStore[
        existingFoundationIndex - 1
      ].cards.filter(
        (previousFoundationCard) => previousFoundationCard.value === card.value
      );
      if (previousFoundationHasValue.length > 0) {
        const existingFoundationCopy = foundationStore[existingFoundationIndex];
        existingFoundationCopy.cards.push(card);
        removeCardFromTableau();
      }
    }
  }

  async function handleDragStart() {
    setDropTargetValues();
  }

  async function handleDragEnd(e) {
    console.log("drag end");
    if (!dropTargetBounds) {
      setClickBounds({ clickPlay: true });
      return;
    } else {
      const dropPosition = { x: ~~e.clientX, y: ~~e.clientY };
      if (
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
      }
    }
    await wait(200);
    setClickBounds({ clickPlay: true });
  }

  function setDropTargetValues() {
    //options: 1. =startValue, set in a new foundationRow
    if (card.value === foundationStartValue) {
      setClickBounds({ clickPlay: false });
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );
      const targetFoundation = foundationStore[nextFoundationIndex];
      setDropTargetIndex(nextFoundationIndex);
      setDropTargetBounds(targetFoundation.bounds);
      return;
    }
    //2. suit already has a row... find suit foundation index and bounds
    const existingFoundationIndex = foundationStore.findIndex(
      (el) => el.suit === card.suit
    );
    if (existingFoundationIndex === 0) {
      setClickBounds({ clickPlay: false });
      const existingFoundation = foundationStore.find(
        (el) => el.suit === card.suit
      );
      setDropTargetIndex(existingFoundationIndex);
      setDropTargetBounds(existingFoundation.bounds);
      return;
    }
    //if existing index is 1,
    if (existingFoundationIndex > 0) {
      setClickBounds({ clickPlay: false });
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
      return;
    }
    //3.  value not starter and suit not in a row.
    else {
      setDropTargetIndex(null);
      setDropTargetBounds(null);
    }
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
            onDragStart={handleDragStart}
            onDragEnd={(e) => handleDragEnd(e)}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onClick={(e) => handleClick(e)}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
          >
            <CardTopCorner>
              <p>{card.value}</p>
              <p>{card.suit}</p>
            </CardTopCorner>
            <CardFace>
              <CardFaceFont>{card.suit}</CardFaceFont>
            </CardFace>
            <CardBottomCorner>
              <p>{card.value}</p>
              <p>{card.suit}</p>
            </CardBottomCorner>
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
  position: fixed;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  z-index: 1001;
`;
