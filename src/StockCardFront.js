import React, { useState } from "react";
import { useAppState } from "./AppContext";
import { CardFront, CardFont } from "./CardStyles";
export default function StockCardFront({ facedown = false, i, card }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();

  const {
    foundationStore,
    updateFoundationStore,
    foundationStartValue,
    discardPile,
    updateDiscardPile,
  } = useAppState();

  function removeCardFromDiscardPile() {
    const discardPileCopy = [...discardPile];
    discardPileCopy.pop();
    updateDiscardPile(discardPileCopy);
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
      removeCardFromDiscardPile();
    } else {
      console.log("invalid drop");
    }
    //need to reset dropTargetValues to undefined
  }

  return (
    <CardFront
      key={"f"}
      offset={`${i * 2}px`}
      // custom={i}
      initial={{ rotateY: -90, scale: 1.1, translateX: -30 }}
      animate={{
        rotateY: 0,
        translateX: 0,
        scale: 1,
        transition: { delay: 0.1, duration: 0.1 },
      }}
      exit={{ rotateY: 0, translateX: 0 }}
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
  );
}
