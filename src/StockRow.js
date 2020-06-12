import React from "react";
import Card from "./Card";

export default function StockRow() {
  const stock = [
    { suit: "h", value: 0 },
    { suit: "h", value: 10 },
    { suit: "h", value: 20 },
    { suit: "h", value: 30 },
    { suit: "h", value: 40 },
    { suit: "h", value: 50 },
  ];
  const discardPile = [
    { suit: "h", value: 50 },
    { suit: "h", value: 50 },
    { suit: "h", value: 50 },
  ];
  return (
    <div className="cardRow stockRow">
      <div className="cardPileAnchor stockPile">
        {stock.map((card, i) => (
          <Card key={i} i={i} card={card} facedown={true} />
        ))}
      </div>
      <div className="cardPileAnchor">
        {discardPile.map((card, i) => (
          <Card key={i} card={card} i={i} />
        ))}
      </div>
    </div>
  );
}
