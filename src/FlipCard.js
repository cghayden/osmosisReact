import React from "react";
import styled from "styled-components";

const PlayingCard = styled.div`
  background: transparent;
  width: var(--cardWidth);
  height: var(--cardHeight);
  display: inline-block;
  perspective: 1000px;
  margin: 20px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid #000;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.facedown ? `rotateY(180deg) translate3d(-20px, 0, 0)` : "none"};
`;

export default function FlipCard(
  { card = { suit: "h", value: "10" } },
  facedown
) {
  function handleDragStart(e) {
    console.log("e:", e);
    // e.dataTransfer.dropEffect = "move";
    // const jsonCard = JSON.stringify(card);
    // e.dataTransfer.setData("text", jsonCard);
    // dragStore.set({ card: card, tableauFrom: setupLocation });
  }

  return (
    <PlayingCard
      className="playing-card"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <Card className="flip-card" facedown={facedown}>
        <div class="card-back" />
        <div class="card-front">
          <p class="cardValue">{card.value}</p>
          <p class="cardSuit">{card.suit}</p>
        </div>
      </Card>
    </PlayingCard>
  );
}
