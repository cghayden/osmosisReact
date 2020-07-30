import React, { useRef, useEffect, useState } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import FoundationCard from "./FoundationCard";

export default function FoundationRow({ foundationIndex, cards, top }) {
  const [leftBound, setLeftBound] = useState(140);
  const [cardWidth, setCardWidth] = useState(98);
  let rowRef = useRef();
  let anchorRef = useRef();
  const { foundationStore, updateFoundationStore, gameNumber } = useAppState();

  function setBounds() {
    const cardSize = anchorRef.current.getBoundingClientRect();
    const newCardWidth = cardSize.right - cardSize.left;
    console.log("newCardWidth:", newCardWidth);
    setCardWidth(newCardWidth);
    const rowClientRect = rowRef.current.getBoundingClientRect();
    // console.log("f-rowClientRect:", rowClientRect);
    setLeftBound(rowClientRect.left);
    const newFoundationStore = [...foundationStore];
    newFoundationStore[foundationIndex].bounds = rowClientRect;
    updateFoundationStore(newFoundationStore);
  }

  useEffect(setBounds, [gameNumber]);

  return (
    <motion.div ref={rowRef}>
      <div className="cardPileAnchor" ref={anchorRef}>
        {cards.map((card, i) => {
          // new left = card offset(i*22), leftBound(dynamic) + f-row padding(20)
          //old left = card offset(i*22) + tab column width(hard 140) + f-row padding(20)
          const offset = i * cardWidth * 0.35;
          const left = offset + leftBound + 20;
          return (
            <FoundationCard
              key={card.uid}
              card={card}
              i={i}
              top={top}
              left={left}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
