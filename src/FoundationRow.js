import React, { useRef, useEffect } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import Card from "./Card";

export default function FoundationRow({ fid, cards }) {
  // let rowRef = useRef();
  // const { foundations, updateFoundations } = useAppState();
  // console.log("foundations:", foundations);

  // useEffect(() => {
  //   const rowSuit = cards[0].suit;
  //   const fClient = rowRef.current.getBoundingClientRect();
  //   updateFoundations((foundations) => (foundations[rowSuit].bounds = fClient));
  // }, [cards, foundations, updateFoundations]);

  return (
    <motion.div
      // ref={rowRef}
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
