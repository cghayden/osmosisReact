import React from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import StockCardFront from "./StockCardFront";
import StockCardBack from "./StockCardBack";
import { useAppState } from "./AppContext";

export default function StockRow() {
  const {
    stock = [],
    discardPile = [],
    updateDiscardPile,
    updateStock,
  } = useAppState();

  function resetStock() {
    const newStock = [...discardPile].reverse();
    updateStock(newStock);
    updateDiscardPile([]);
  }
  function flip1() {
    if (stock.length < 1) {
      resetStock();
      return;
    }
    const stockCopy = [...stock];
    const discardPileCopy = [...discardPile];
    const next1 = stockCopy.splice(stockCopy.length - 1);
    updateDiscardPile([...discardPileCopy, ...next1]);
    updateStock(stockCopy);
    return;
  }

  return (
    <div className="cardRow stockRow">
      <div className="cardPileAnchor stockPile" onClick={flip1}>
        <EmptyStock />
        <AnimatePresence>
          {[...stock].splice(stock.length - 4).map((card, i) => (
            <StockCardBack key={card.uid} i={i} card={card} />
          ))}
        </AnimatePresence>
      </div>
      <div className="cardPileAnchor">
        {discardPile.map((card, i) => {
          return <StockCardFront key={card.uid} i={i} card={card} />;
        })}
      </div>
    </div>
  );
}
const EmptyStock = styled.div`
  position: absolute;
  left: 0;
  width: var(--cardWidth);
  height: var(--cardHeight);
  border-radius: 5px;
  border: 1px solid black;
  background-color: pink;
`;
