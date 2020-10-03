import React, { useRef, useContext } from "react";
import {
  CardFront,
  CardFaceFont,
  CardFace,
  CardTopCorner,
  CardBottomCorner,
} from "./CardStyles";
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
    transition: { duration: 20 },
    translateX: 0,
    translateY: 0,
  },
};

export default function FoundationCard({ card, top, left }) {
  const { clickBounds } = useContext(AppContext);
  const fnCardRef = useRef();
  function onAnimationComplete() {
    fnCardRef.current.classList.remove("z-over");
    fnCardRef.current.classList.add("z-under");
  }

  function onAnimationStart() {
    fnCardRef.current.classList.add("z-over");
  }

  return (
    <FoundationCardFront
      ref={fnCardRef}
      red={card.suit === "\u{2665}" || card.suit === "\u{2666}"}
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
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      <CardTopCorner>
        <p>{card.value}</p>
        <p>{card.suit}</p>
      </CardTopCorner>
      <CardFace>
        <CardFaceFont>{card.suit}</CardFaceFont>
      </CardFace>
      <CardBottomCorner>
        <p>{card.value}</p>
        <p>{card.suit}</p>
      </CardBottomCorner>
    </FoundationCardFront>
  );
}

const FoundationCardFront = styled(CardFront)`
  position: fixed;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
`;
