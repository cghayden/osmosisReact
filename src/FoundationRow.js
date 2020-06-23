import React, { useRef, useEffect } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import FoundationCard from "./FoundationCard";

export default function FoundationRow({ foundationIndex, cards }) {
  let rowRef = useRef();
  const { foundationStore, updateFoundationStore, gameNumber } = useAppState();
  console.log("foundationStore:", foundationStore);

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
        {cards.map((card, i) => (
          <FoundationCard key={card.uid} card={card} i={i} />
        ))}
      </div>
    </motion.div>
  );
}

// function setFoundationRef() {
//   const newFoundationStore = { ...foundationStore };
//   newFoundationStore[foundationIndex].ref = rowRef.current;
//   updateFoundationStore(newFoundationStore);
// }

// useEffect(setFoundationRef, []);
