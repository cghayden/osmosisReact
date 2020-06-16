import React from "react";
import TableauCard from "./TableauCard";

export default function TableauPile({ cards = [] }) {
  return (
    <div className="cardRow">
      <div className="cardPileAnchor">
        {cards.map((card, i) => {
          if (i === cards.length - 1) {
            return <TableauCard key={i} i={i} card={card} />;
          } else {
            return <TableauCard key={i} i={i} card={card} facedown={true} />;
          }
        })}
      </div>
    </div>
  );
}
