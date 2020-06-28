import React, { useContext } from "react";
import TableauCard from "./TableauCard";
import { useAppState, AppContext } from "./AppContext";

export default function TableauPile({ cards = [], tid, top }) {
  const { dealing } = useContext(AppContext);
  return (
    <div className="cardRow">
      {cards.map((card, i) => {
        const left = i * 2 + 40;
        if (i === cards.length - 1) {
          return (
            <TableauCard
              key={i}
              i={i}
              card={card}
              tid={tid}
              top={top}
              left={left}
              facedown={dealing}
            />
          );
        } else {
          return (
            <TableauCard
              facedown={true}
              key={i}
              i={i}
              card={card}
              tid={tid}
              top={top}
              left={left}
            />
          );
        }
      })}
    </div>
  );
}
