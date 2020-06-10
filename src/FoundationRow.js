import React from "react";
// import styled from 'styled-components';
import Card from "./Card";

export default function FoundationRow({ cards }) {
  return (
    <div className="cardRow">
      <div className="cardPileAnchor">
        {cards.map((card, i) => (
          <Card key={card.uid} card={card} i={i} />
        ))}
      </div>
    </div>
  );
}
