import React from "react";
import { CardBack } from "./CardStyles";

const cardBackVariants = {
  enter: { rotateY: 0 },
  inPlace: { rotateY: 0 },
  flip: {
    rotateY: 90,
    translateX: 60,
    scale: 1.1,
    zIndex: 2000,
    background: "var(--cardFlipShadow)",
  },
};

export default function StockCardBack({ i, card }) {
  return (
    <CardBack
      key={card.uid}
      offset={`${i * 2}px`}
      variants={cardBackVariants}
      initial="enter"
      animate="inPlace"
      exit="flip"
      transition={{ duration: 0.1 }}
      positionTransition
    />
  );
}
