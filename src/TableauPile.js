import React from "react";
import Card from "./Card";

export default function TableauPile({ cards = [] }) {
  return (
    <div className="cardRow">
      <div className="cardPileAnchor">
        {cards.map((card, i) => {
          if (i === cards.length - 1) {
            return <Card key={i} i={i} card={card} />;
          } else {
            return <Card key={i} i={i} card={card} facedown={true} />;
          }
        })}
      </div>
    </div>
  );
}
