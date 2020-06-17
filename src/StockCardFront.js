import React, { useState } from "react";
import { useAppState } from "./AppContext";
import { CardFront, CardFont, FullCardFaceDiv, CardCorner } from "./CardStyles";

export default function StockCardFront({ i, card }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();

  const {
    foundationStore,
    updateFoundationStore,
    foundationStartValue,
    discardPile,
    updateDiscardPile,
    tableauStore,
    updateTableauStore,
  } = useAppState();

  function handleDragStart(e, info) {
    setDropTargetValues();
  }

  function setDropTargetValues() {
    //options: 1. =startValue, set in a new foundationRow
    if (card.value === foundationStartValue) {
      const nextFoundationIndex = foundationStore.findIndex(
        (el) => el.suit === null
      );
      console.log("new Foundation, Index:", nextFoundationIndex);

      const targetFoundation = foundationStore[nextFoundationIndex];
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

  function handleDragEnd(e, source) {
    function removeCardFromTableau() {
      const tableauCopy = { ...tableauStore };
      tableauCopy[card.startLocation].pop();
      updateTableauStore(tableauCopy);
    }
    function removeCardFromDiscardPile() {
      const discardPileCopy = [...discardPile];
      discardPileCopy.pop();
      updateDiscardPile(discardPileCopy);
    }

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
      if (source === "discard") {
        removeCardFromDiscardPile();
      }
      if (source === "tableau") {
        removeCardFromTableau();
      }
    } else {
      return;
    }
    //need to reset dropTargetValues to undefined
  }

  return (
    <CardFront
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
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
      onDragEnd={(e) => handleDragEnd(e, "discard")}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
    >
      <CardCorner>
        <p className="value">{card.value}</p>
        <p className="suit">{card.suit}</p>
      </CardCorner>
      <FullCardFaceDiv>
        <CardFont>{card.value}</CardFont>
        <CardFont>{card.suit}</CardFont>
      </FullCardFaceDiv>
    </CardFront>
  );
}
