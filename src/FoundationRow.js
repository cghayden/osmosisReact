import React, { useRef, useEffect } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import Card from "./Card";

export default function FoundationRow({ foundationIndex, cards }) {
  let rowRef = useRef();
  const {
    // setFoundationRefs,
    // foundationRefs,
    foundationStore,
    updateFoundationStore,
  } = useAppState();

  function setFoundationRef() {
    const newFoundationStore = { ...foundationStore };
    newFoundationStore[foundationIndex].ref = rowRef.current;
    updateFoundationStore(newFoundationStore);
  }

  useEffect(setFoundationRef, []);

  function setBounds() {
    const rowClientRect = rowRef.current.getBoundingClientRect();
    const newFoundationStore = [...foundationStore];
    newFoundationStore[foundationIndex].bounds = rowClientRect;
    updateFoundationStore(newFoundationStore);
  }

  useEffect(setBounds, []);

  return (
    <motion.div
      ref={rowRef}
      style={{ width: "500px", zIndex: -1 }}
      className="cardRow"
      id={`f${foundationIndex}`}
    >
      <div className="cardPileAnchor">
        {cards.map((card, i) => (
          <Card key={card.uid} card={card} i={i} />
        ))}
      </div>
    </motion.div>
  );
}
