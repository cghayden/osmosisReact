import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

export default function StockCardBack({ i, card }) {
  return (
    <StockCardBackDiv
      key={card.uid}
      offset={`${i * 2}px`}
      variants={cardBackVariants}
      initial="enter"
      animate="inPlace"
      exit="flip"
      transition={{ duration: 0.1 }}
    />
  );
}

const StockCardBackDiv = styled(motion.div)`
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
