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
    setClickBounds,
    stockBounds,
  } = useAppState();

  function handleMouseDown() {
    setDropTargetValues();
  }

  function handleMouseUp(e) {
    if (!dropTargetBounds) {
      return;
    }
    setClickBounds((clickBounds) => {
      return {
        ...clickBounds,
        clickPlay: true,
        sourceLeft: stockBounds.left + 100,
        sourceTop: stockBounds.top,
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
    removeCardFromDiscardPile();
  }

  function setDropTargetValues(e) {
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
  function removeCardFromDiscardPile() {
    const discardPileCopy = [...discardPile];
    discardPileCopy.pop();
    updateDiscardPile(discardPileCopy);
  }

  function handleDragEnd(e, source) {
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
      removeCardFromDiscardPile();
    } else {
      return;
    }
    //need to reset dropTargetValues to undefined
  }

  return (
    <DiscardFront
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
      offset={i < 4 ? `${i * 2}px` : "6px"}
      variants={variants}
      initial={"initial"}
      animate={"animate"}
      drag={drag}
      onDragStart={setDropTargetValues}
      onDragEnd={(e) => handleDragEnd(e, "discard")}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      zINdex={zIndex}
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
