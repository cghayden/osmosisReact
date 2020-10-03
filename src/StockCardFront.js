import React, { useState } from "react";
import { useAppState } from "./AppContext";
import {
  CardFront,
  CardFaceFont,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
} from "./CardStyles";
import styled from "styled-components";
import wait from "waait";

const variants = {
  initial: {
    rotateY: -90,
    scale: 1.1,
    translateX: -10,
  },
  animate: {
    rotateY: 0,
    scale: 1,
    translateX: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    transition: { delay: 0.5 },
  },
};

export default function StockCardFront({ i, card, drag, zIndex }) {
  const [dropTargetBounds, setDropTargetBounds] = useState();
  const [dropTargetIndex, setDropTargetIndex] = useState();

  const {
    foundationStore,
    updateFoundationStore,
    foundationStartValue,
    discardPile,
    updateDiscardPile,
    clickBounds,
    setClickBounds,
  } = useAppState();

  function removeCardFromDiscardPile() {
    const discardPileCopy = [...discardPile];
    discardPileCopy.pop();
    updateDiscardPile(discardPileCopy);
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
      removeCardFromDiscardPile();
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
      removeCardFromDiscardPile();
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
        removeCardFromDiscardPile();
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
        removeCardFromDiscardPile();
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

  return (
    <DiscardFront
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
      offset={i < 4 ? `${i * 2}px` : "6px"}
      variants={variants}
      initial={"initial"}
      animate={"animate"}
      drag={drag}
      onDragStart={handleDragStart}
      onDragEnd={(e) => handleDragEnd(e)}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onClick={(e) => handleClick(e)}
      zIndex={zIndex}
    >
      <CardTopCorner>
        <p className="value">{card.value}</p>
        <p className="suit">{card.suit}</p>
      </CardTopCorner>
      <CardFace>
        <CardFaceFont>{card.suit}</CardFaceFont>
      </CardFace>
      <CardBottomCorner>
        <p>{card.value}</p>
        <p>{card.suit}</p>
      </CardBottomCorner>
    </DiscardFront>
  );
}

const DiscardFront = styled(CardFront)`
  transform-origin: 0% 50% 0px;
  z-index: ${(props) => props.zIndex};
  box-shadow: 0px 1px 1px 0px hsl(120, 50%, 15%);
`;
