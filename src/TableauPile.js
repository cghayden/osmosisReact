import React from "react";
import TableauCard from "./TableauCard";
import { useAppState } from "./AppContext";

export default function TableauPile({ cards = [], tid, top }) {
  const { dealing } = useAppState();
  return (
    <div>
      {cards.map((card, i) => {
        const left = i * 2 + 40;
        return (
          <TableauCard
            key={i}
            card={card}
            top={top}
            left={left}
            facedown={dealing || i !== cards.length - 1}
          />
        );
      })}
    </div>
  );
}
