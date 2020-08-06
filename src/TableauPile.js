import React, { useRef, useEffect, useState } from "react";
import TableauCard from "./TableauCard";
import { useAppState } from "./AppContext";

export default function TableauPile({ cards = [], tid, top }) {
  const [leftBound, setLeftBound] = useState(20);
  const [topBound, setTopBound] = useState(140);

  let pileRef = useRef();
  const { dealing, gameNumber } = useAppState();

  function setBounds() {
    const tPileRect = pileRef.current.getBoundingClientRect();
    setLeftBound(tPileRect.left);
    setTopBound(tPileRect.top);
  }

  useEffect(setBounds, [gameNumber]);
  return (
    <div ref={pileRef} className="rowAnchor">
      {cards.map((card, i) => {
        //old left = offset(i*2) + padding(40)
        // const left = i * 2 + 40;
        //new left = offset(i*2) + leftBound(dynamic) + left padding(10)
        const left = i * 2 + leftBound + 10;
        return (
          <TableauCard
            key={i}
            card={card}
            top={topBound}
            left={left}
            facedown={dealing || i !== cards.length - 1}
          />
        );
      })}
    </div>
  );
}
