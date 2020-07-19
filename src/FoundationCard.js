import React, { useContext } from "react";
import { CardFront, CardFont, FullCardFaceDiv, CardCorner } from "./CardStyles";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const cardVariants = {
  initial: (custom) => {
    return {
      translateX: custom.clickPlay ? custom.sourceLeft - custom.left : 0,
      translateY: custom.clickPlay ? custom.sourceTop - custom.top : 0,
    };
  },
  animate: {
    translateX: 0,
    translateY: 0,
  },
};

export default function FoundationCard({ i, card, top, left }) {
  const { clickBounds } = useContext(AppContext);
  return (
    <FoundationCardFront
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
      // offset={`${i * 24}px`}
      foundation
      variants={cardVariants}
      initial={"initial"}
      animate={"animate"}
      custom={{
        top,
        left,
        clickPlay: clickBounds.clickPlay,
        sourceLeft: clickBounds.sourceLeft,
        sourceTop: clickBounds.sourceTop,
      }}
      top={top}
      left={left}
    >
      <CardCorner>
        <p>{card.value}</p>
        <p>{card.suit}</p>
      </CardCorner>
      <FullCardFaceDiv>
        <CardFont>{card.value}</CardFont>
        <CardFont>{card.suit}</CardFont>
      </FullCardFaceDiv>
    </FoundationCardFront>
  );
}

const FoundationCardFront = styled(CardFront)`
  position: fixed;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
`;
