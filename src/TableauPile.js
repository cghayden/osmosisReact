import React from "react";
import TableauCard from "./TableauCard";

export default function TableauPile({ cards = [], tid, top }) {
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
