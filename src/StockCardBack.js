import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppState } from "./AppContext";

const cardBackVariants = {
  enter: { rotateY: 0 },
  inPlace: { rotateY: 0 },
  flip: {
    rotateY: 90,
    translateX: 50,
    scale: 1.1,
    zIndex: 2000,
    backgroundColor: `#247f7f`,
  },
};

export default function Card({ facedown = false, i, card }) {
  const { discardPile, updateDiscardPile, stock, updateStock } = useAppState();

  function nextThreeCards() {
    const stockCopy = [...stock];
    const discardPileCopy = [...discardPile];
    if (stock.length > 2) {
      const next3 = stockCopy.splice(stockCopy.length - 3);
      console.log("spliced stockCopy:", stockCopy);
      updateDiscardPile([...discardPileCopy, ...next3]);
      updateStock(stockCopy);
      return;
    }
    if (stock.length === 2) {
      console.log("flip last 2");
    }
    if (stock.length === 1) {
      const next1 = stockCopy.splice(stockCopy.length - 1);
      updateDiscardPile([...discardPileCopy, ...next1]);
      updateStock(stockCopy);
      return;
    }
    if (stock.length === 0) {
      console.log("flip discard pile back to stock");
    }
  }
  function flip1() {
    const stockCopy = [...stock];
    const discardPileCopy = [...discardPile];
    const next1 = stockCopy.splice(stockCopy.length - 1);
    updateDiscardPile([...discardPileCopy, ...next1]);
    updateStock(stockCopy);
    return;
  }

  return (
    <StockCardBack
      key={card.uid}
      offset={`${i * 2}px`}
      variants={cardBackVariants}
      initial="enter"
      animate="inPlace"
      exit="flip"
      transition={{ duration: 0.1 }}
      onClick={flip1}
    />
  );
}

const StockCardBack = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: var(--cardBack);
  transform-style: preserve-3d;
  backface-visibility: visible;
`;
