import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CardFont from "./CardFont";
export default function CardFrontOnly({ i, card }) {
  return (
    <CardFrontStyle offset={`${i * 10}px`}>
      <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
        {card.value}
      </CardFont>
      <CardFont red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}>
        {card.suit}
      </CardFont>
    </CardFrontStyle>
  );
}

const CardFrontStyle = styled(motion.div)`
  position: absolute;
  left: ${(props) => props.offset};
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background: white;
  color: black;
  display: grid;
  grid-template-rows: repeat(2, 50px);
  place-items: center;
  border-radius: 5px;
  backface-visibility: hidden;
`;
