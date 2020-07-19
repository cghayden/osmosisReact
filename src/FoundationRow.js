import React, { useRef, useEffect } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import FoundationCard from "./FoundationCard";

export default function FoundationRow({ foundationIndex, cards, top }) {
  let rowRef = useRef();
  const { foundationStore, updateFoundationStore, gameNumber } = useAppState();

  function setBounds() {
    const rowClientRect = rowRef.current.getBoundingClientRect();
    const newFoundationStore = [...foundationStore];
    newFoundationStore[foundationIndex].bounds = rowClientRect;
    updateFoundationStore(newFoundationStore);
  }

  useEffect(setBounds, [gameNumber]);

  return (
    <motion.div ref={rowRef} className="cardRow" id={`f${foundationIndex}`}>
      <div className="cardPileAnchor">
        {cards.map((card, i) => {
          const left = i * 22 + 150;
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
