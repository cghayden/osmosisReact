import React from "react";
import { CardFront, CardFont, FullCardFaceDiv, CardCorner } from "./CardStyles";

export default function CardFrontOnly({ i, card }) {
  return (
    <CardFront
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
      foundation={true}
      offset={`${i * 10}px`}
    >
      <CardCorner>
        <p>{card.value}</p>
        <p>{card.suit}</p>
      </CardCorner>
      <FullCardFaceDiv>
        <CardFont className="value">{card.value}</CardFont>
        <CardFont className="suit">{card.suit}</CardFont>
      </FullCardFaceDiv>
    </CardFront>
  );
}
