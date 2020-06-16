import React from "react";
import { CardFront, CardFont } from "./CardStyles";

export default function CardFrontOnly({ i, card }) {
  return (
    <CardFront foundation={true} offset={`${i * 10}px`}>
      <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
        {card.value}
      </CardFont>
      <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
        {card.suit}
      </CardFont>
    </CardFront>
  );
}
