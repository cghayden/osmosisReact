import React, { useRef, useEffect, useState } from "react";
import { useAppState } from "./AppContext";
import { motion } from "framer-motion";
import FoundationCard from "./FoundationCard";

export default function FoundationRow({ foundationIndex, cards, cardWidth }) {
  const [leftBound, setLeftBound] = useState(140);
  const [topBound, setTopBound] = useState(140);
  let cardRowRef = useRef();
  const { foundationStore, updateFoundationStore, gameNumber } = useAppState();

  function setRowBounds() {
    const rowBounds = cardRowRef.current.getBoundingClientRect();
    setLeftBound(rowBounds.left);
    setTopBound(rowBounds.top);
    const newFoundationStore = [...foundationStore];
    newFoundationStore[foundationIndex].bounds = rowBounds;
    updateFoundationStore(newFoundationStore);
  }

  useEffect(setRowBounds, [gameNumber]);

  return (
    <>
      <div ref={cardRowRef} className="rowAnchor" />
      {cards.map((card, i) => {
        // new left = card offset(i*22), leftBound(dynamic) + f-row padding(20)
        //old left = card offset(i*22) + tab column width(hard 140) + f-row padding(20)
        const offset = i * cardWidth * 0.37;
        const left = offset + leftBound + 20;
        return (
          <FoundationCard
            key={card.uid}
            card={card}
            top={topBound}
            left={left}
          />
        );
      })}
    </>
  );
}
