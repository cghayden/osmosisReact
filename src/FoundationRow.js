import React, { useRef, useEffect } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import Card from "./Card";

export default function FoundationRow({ fid, cards }) {
  let rowRef = useRef();
  const { suitPlacements, updateSuitPlacements } = useAppState();
  console.log("suitPlacements:", suitPlacements);

  function setBounds() {
    const rowSuit = cards[0].suit;
    const rowClientRect = rowRef.current.getBoundingClientRect();
    const updatedPlacements = {
      ...suitPlacements,
      [rowSuit]: { foundation: fid, bounds: rowClientRect },
    };
    updateSuitPlacements(updatedPlacements);
  }

  useEffect(setBounds, []);

  return (
    <motion.div
      ref={rowRef}
      style={{ width: "500px", zIndex: -1 }}
      className="cardRow"
      id={fid}
      onDragOver={() => false}
      onPointerUp={(e) => console.log("pointer up:", e)}
    >
      <div className="cardPileAnchor">
        {cards.map((card, i) => (
          <Card key={card.uid} card={card} id={fid} />
        ))}
      </div>
    </motion.div>
  );
}
